# import pip
# pip.main(['install','mysql-connector-python'])
import mysql.connector
from flask import Flask

# Configuração do banco de dados
mydb = mysql.connector.connect(
    host='127.0.0.1',
    user='root',
    password='guilherme22',
    database='basemetrosp',
    auth_plugin='caching_sha2_password'
)

# Cria um cursor
cursor = mydb.cursor()

# Executa a consulta para buscar a coluna "nomes" da tabela "linhaazul"
sql = "SELECT * FROM linhaazul;"
cursor.execute(sql)

# Busca todas as linhas
results = cursor.fetchall()

# Imprime os nomes
for row in results:
    print(row[0], row[1], row[2], row[3], row[4])

# Fecha o cursor e a conexão
cursor.close()
mydb.close()