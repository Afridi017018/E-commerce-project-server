const fs = require('fs');

const deleteImage = async (userImagePath)=>{
          try {
            await fs.access(userImagePath)
         await fs.unlink(userImagePath) 
         console.log('user was image deleted')
          } catch (error) {
            console.error('user image does not exist');
          }
        
}



module.exports = {deleteImage};