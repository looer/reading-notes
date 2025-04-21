import fs from "fs"
import path from "path"

function renameFiles(directory) {
    // Read all files in the directory
    fs.readdir(directory, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err)
            return
        }

        files.forEach(file => {
            const fullPath = path.join(directory, file.name)

            if (file.isDirectory()) {
                // Recursively process subdirectories
                renameFiles(fullPath)
            } else if (file.name.includes(' - .epub.annot')) {
                // Create new filename by removing a part of the name
                const newName = file.name.replace(' - .epub.annot', '.epub.annot')
                const newPath = path.join(directory, newName)

                // Rename the file
                fs.rename(fullPath, newPath, (err) => {
                    if (err) {
                        console.error(`Error renaming ${file.name}:`, err)
                    } else {
                        console.log(`Renamed: ${file.name} -> ${newName}`)
                    }
                })
            }
    })
  })
}

// Start from the current directory
const startDir = process.argv[2] || "."
console.log(`Starting to rename files in: ${startDir}`)
renameFiles(startDir)
