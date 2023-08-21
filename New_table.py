from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from BackEnd.src.API import app, db




migrate = Migrate(app, db)

class Usuario(db.Model):
    __tablename_ = "Usuario"

    login = db.Column(db.String(15), primary_key=True)
    password = db.Column(db.String(20))

    def __init__(self, log, passw):
        self.login = log
        self.password = passw
      
class IP(db.Model):
    
    __tablename__ = "IP"

    ip = db.Column(db.String(12), primary_key=True)
    continente = db.Column(db.String(20))
    pais = db.Column(db.String(50))
    estado = db.Column(db.String(15))
    cidade = db.Column(db.String(50))

    