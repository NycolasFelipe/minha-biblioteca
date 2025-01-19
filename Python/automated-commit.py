import pathlib
from git.repo import Repo

# Requires GitPython - pip install GitPython

# Inicializa o repositório Git no diretório especificado (path)
# e obtém objetos para interagir com o repositório e o índice.
repo_path = pathlib.Path(__file__).parent.resolve()
repo = Repo.init(repo_path)
git = repo.git
index = repo.index
origin = repo.remotes[0]

class colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

# Função para verificar se há arquivos staged
def has_staged_files():
    return bool(repo.index.diff("HEAD"))

# Apresentação do programa
print(f"\n{'#'*20} CONVENTIONAL COMMITS v2.0 {'#'*20}")
print("\nDigite 0 em qualquer etapa para cancelar o commit.")

# Verifica se há arquivos staged antes de prosseguir
if not has_staged_files():
    print(colors.FAIL + "\nNenhum arquivo staged encontrado. Por favor, adicione arquivos ao stage antes de continuar.\n" + colors.ENDC)
    quit()

# Apresenta as opções de tipos de commit disponíveis ao usuário,
# seguindo a convenção de Conventional Commits.
print("""
Tipos de commit:
1 [test]: Qualquer tipo de criação ou alteração de códigos de teste.
Exemplo: Criação de testes unitários.

2 [feat]: Desenvolvimento de uma nova feature ao projeto. 
Exemplo: Acréscimo de um serviço, funcionalidade, endpoint, etc.

3 [refactor]: Refatoração de código que não tenha qualquer tipo de impacto no funcionamento do projeto.
Exemplo: Alteração do código para melhorar a performance.

4 [style]: Mudanças de formatação e/ou estilo que não alteram o sistema. 
Exemplo: Alterar a cor de um container, mudar o tamanho de um texto, etc.

5 [fix]: Correção de erros que estão gerando bugs no sistema.
Exemplo: Aplicar tratativa para uma função que não está tendo o comportamento esperado e retornando erro.

6 [chore]: Mudanças no projeto que não afetem o sistema ou arquivos de testes. Mudanças de desenvolvimento.
Exemplo: Remover linhas de comentários, remover logs do console, alterar o .gitignore, remover arquivos que não são mais utilizados, etc.

7 [docs]: Mudanças na documentação do projeto.
Exemplo: Adicionar informações na documentação da API, mudar o README, etc.

8 [build]: Mudanças que afetam o processo de build do projeto ou dependências externas.
Exemplo: Adicionar/remover dependências do npm, etc.

9 [revert]: Reversão para um commit anterior.""")

# Retorna o tipo de commit correspondente ao número fornecido.
def get_commit_type(num):
    return {
        1: "test",
        2: "feat",
        3: "refactor",
        4: "style",
        5: "fix",
        6: "chore",
        7: "docs",
        8: "build",
        9: "revert",
    }.get(num)

# Solicita ao usuário que selecione um tipo de commit e retorna o tipo escolhido.
def select_commit_type():
    while True:
        print("\nSelecione um tipo de commit:")
        num = int(input(">>> "))
        if num == 0:
            quit()
        commit_type = get_commit_type(num)
        if commit_type:
            print("\nTipo de commit escolhido: " + colors.OKGREEN + f"[{commit_type}]" + colors.ENDC)
            return commit_type
        print("\nTipo inválido.")

# Solicita ao usuário que insira o escopo da mudança e retorna o escopo.
def set_scope():
    while True:
        print("\nInsira o nome do escopo modificado. Exemplo: Tela de login, assets, etc.")
        scope = input(">>> ").strip()
        if scope == "0":
            quit()
        if scope:
            print("\nEscopo modificado: " + colors.OKGREEN + f"[{scope}]" + colors.ENDC)
            return scope
        print("\nInsira o nome do escopo.")

# Solicita ao usuário que insira uma descrição detalhada da mudança e retorna a descrição.
def set_description():
    while True:
        print("\nInsira uma descrição. Exemplo: Correção de bug na página de matrícula.")
        description = input(">>> ").strip()
        if description == "0":
            quit()
        if description:
            print("\nDescrição: " + colors.OKGREEN + f"[{description}]" + colors.ENDC)
            return description
        print("\nInsira uma descrição.")

# Loop principal do programa
while True:
    commit_type = select_commit_type()
    scope = set_scope()
    description = set_description()
    
    commit_message = f"{commit_type}({scope}): {description}"
    
    print("\nMensagem de commit:")
    print(colors.BOLD + f"git commit -m \"{commit_message}\"" + colors.ENDC)

    print("\nConfirmar commit?")
    print("1. Sim")
    print("2. Tentar novamente")
    print("3. Sair")
    confirm = input(">>> ").strip()
    
    if confirm == "1":
        index.commit(commit_message)
        origin.push()
        print(colors.OKGREEN + "\nCommit e push realizado com sucesso.\n" + colors.ENDC)
        quit()
    elif confirm == "2":
        continue
    else:
        quit()
