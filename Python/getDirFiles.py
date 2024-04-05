# import OS module
import os

# Get the list of all files and directories
folder = input("Qual conteúdo? ")
path = "C:/Users/T-GAMER/Desktop/github/narkovia-ficha/src/content/" + folder #<- Exemplo
dir_list = os.listdir(path)
print("Files and directories in '", path, "' :")

# prints all files
print(dir_list)

with open(os.path.join(os.path.dirname(__file__), folder + '.js'), 'w') as f:
    items = str(dir_list) + ";"

    f = open(folder + '.js', 'w')
    f.write(items)
    f.close()