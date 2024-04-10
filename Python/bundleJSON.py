import glob, os, re, shutil
folders = glob.glob("./*")

# combine all json files inside n folders into one minified bundle_content.json file
# expected folders structure:
# root
# | folderA
# | | assetX.json
# | | assetY.json
# | | [...]
# | folderB
# | | assetZ.json
# | | assetW.json
# | | [...]
# | [...]
# | bundleJSON.py

# create result folder
if not os.path.exists(".bundle-json"):
    os.mkdir(".bundle-json")
else:
    print("Directory already exists.")
    quit

# group all json files inside folder into one file
for folder in folders:
    if folder != "._bundle-json" and folder != ".\\" + os.path.basename(__file__):
      folderFiles = glob.glob(folder + "./*.json")
      with open(".bundle-json/" + folder + ".json", "w") as outfile:
        outfile.write('{"' + folder.replace(".\\", "") + '"' + ":" + "[")
        outfile.write("{}".format(",\n".join([open(f, "r").read() for f in folderFiles])))
        outfile.writelines("]}")

# assign all content into one minified _bundle_content.json file
minified = ""
outputName = "bundle"
files = glob.glob("./.bundle-json/*.json")
with open("./" + outputName + ".json", "w") as outfile:
  for f in files:
    file = open(f, 'r')
    content = file.read()
    minified += content
    if f != files[-1]:
      minified += ","
    file.close()
  minified = re.sub(r"[\n\t]*", "", minified)
  minified = re.sub(r"[\s]{2,}", "", minified)
  minified = minified.replace(": ", ":", -1)
  outfile.write("[")
  outfile.write(minified)
  outfile.writelines("]")

# remove temp folder
shutil.rmtree(".bundle-json")

# print result
print("Bundle minified content file created with success \nSaved at " + os.getcwd() + "\\.bundle-json\\.bundle_content.json")