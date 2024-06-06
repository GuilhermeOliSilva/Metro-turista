from flask import Flask, render_template, request
import mysql.connector

app = Flask(__name__, template_folder='templates', static_folder='static')

mydb = mysql.connector.connect(
    host='127.0.0.1',
    user='root',
    password='guilherme22',
    database='basemetrosp',
    auth_plugin='mysql_native_password'
)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        cor = request.form['cor']
        print(cor)
        if cor == 'verde':
            tabela = 'linhaverde'
        elif cor == 'vermelha':
            tabela = 'linhavermelha'
        elif cor == 'amarela':
            tabela = 'linhaamarela'
        else:
            tabela = 'linhaazul'
    else:
        tabela = 'linhaazul'

    cursor = mydb.cursor()
    sql = f"SELECT * FROM {tabela}"
    cursor.execute(sql)
    results = cursor.fetchall()
    cursor.close()

    return render_template('index.html', results=results)

if __name__ == '__main__':
    app.run(debug=True)
