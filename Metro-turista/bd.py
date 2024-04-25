from flask import Flask, render_template
import mysql.connector

app = Flask(__name__, template_folder='templates', static_folder='static')

# Configuração do banco de dados
mydb = mysql.connector.connect(
    host='127.0.0.1',
    user='root',
    password='guilherme22',
    database='basemetrosp',
    auth_plugin='caching_sha2_password'
)

# Rota para a página inicial
@app.route('/')
def index():
    # Cria um cursor
    cursor = mydb.cursor()

    # Executa a consulta para buscar a coluna "nomes" da tabela "linhaazul"
    sql = "SELECT * FROM linhaazul"
    cursor.execute(sql)

    # Busca todas as linhas
    results = cursor.fetchall()

    # Fecha o cursor
    cursor.close()

    # Renderiza o template HTML com os dados obtidos
    return render_template('index.html', results=results)

if __name__ == '__main__':
    app.run(debug=True)