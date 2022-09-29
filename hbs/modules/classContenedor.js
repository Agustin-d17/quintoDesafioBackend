const fs = require('fs');

class Contenedor {
    constructor(file) {
        this.file = file;
    }

    async readFile(){
        try{
            const content = await fs.promises.readFile(this.file, 'utf8');
            const parsedContent = JSON.parse(content)
            return parsedContent
        }catch(err){
            console.log(err)
        }
    }

    async save(obj){
        const content = await this.readFile();
        
            if (content.length !== 0){
                let newId = parseInt(content[content.length - 1].id) + 1
                await fs.promises.writeFile(this.file, JSON.stringify([...content, {...obj, id: `${newId}`}]), 'utf8');
                console.log(`id del elemento agregado: ${newId}`)
            }else{
                await fs.promises.writeFile(this.file, JSON.stringify([{...obj, id: "1"}]), 'utf8');
                console.log(`id del elemento agregado: ${1}`)
            }

    }

    async getById(id){
        try{
            const content = await this.readFile()
            const element = content.find(el => el.id === id)
            
            return element
        }catch(err){
            console.log(err)
        }
    }

    async getAll(){
        try{
            const content = await this.readFile()
            
            return content 
        }catch(err){
            console.log(err)
        }
    }
    
    async deleteById(id) {
        let newContent = [];

        try {
          const content = await this.readFile()
          newContent = content.filter((product) => product.id !== id)
          await fs.promises.writeFile(this.file, JSON.stringify(newContent), 'utf-8')
        //   console.log(newContent)
        } catch (error) {
          console.log(error);
        }
      }
    
    async deleteAll(){
        let newContent = []

        try {
            await fs.promises.writeFile(this.file, JSON.stringify(newContent), 'utf8') 
            console.log("Productos eliminados")
        }catch(err){
            console.log(err)
        }
    }

    async modifyById(id, product) {
        try {
            let content = await this.readFile();
            content = await content.map(el => {
                if (el.id === id) {
                    el = {
                        id: id,
                        ...product,
                    };
                    return el;
                } else {
                    return el;
                }
            })
            await fs.promises.writeFile(this.file, JSON.stringify(content), 'utf-8');

            return 'Objeto actualizado'

        } catch (error) {
            return error;
        }
    }
}

module.exports = Contenedor