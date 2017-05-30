class NotesController < ApplicationController
  def index
    @notes = Note.all
  end
  def create

    @new_note = Note.new(title: params[:title], body: params[:body])

    if @new_note.save
      return render json: @new_note
    end
    flash[:errors] = @new_note.errors.full_messages
    return render json:{result: "Please fill in all field"}
  end

  def update

    @note = Note.find(params[:id])

    @note.body = params[:body]

    puts "************************"
    puts params[:body]
    puts "************************"

    if @note.save
      return render json: {result:"success"}
    else
      return render json: {result:"failed"}
    end


  end



end
