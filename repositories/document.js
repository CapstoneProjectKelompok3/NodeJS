import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const documentRegister = async (request, userId) => {

    let data

    try {
        data = await prisma.document.create({
            data: {
                user_id: userId,
                nik: request.nik
            }
        })
    } catch (err) {
        throw err
    }

    return data

}

export const documentUpdate = async (request, userId) => {
  let updatedDoc;
    try {
        // Membuat objek kosong untuk menampung data baru
        const data = {};
    
        // Membuat array dari nama-nama field yang ingin diperbarui
        const fieldsToUpdate = ['fullname', 'nik', 'phone', 'gender'];
    
        // Menggunakan forEach untuk memasukkan data dari request body
        fieldsToUpdate.forEach((fieldName) => {
          // Menguji masing field di dalam body untuk dimasukkan ke dalam objek data
          if (request.body[fieldName]) {
            data[fieldName] = request.body[fieldName];
          }
        });
    
        updatedDoc = await prisma.document.update({
          where: {
            user_id: userId,
          },
          data: data,
        });
      } catch (error) {
        throw error;
      }
      return updatedDoc;
}