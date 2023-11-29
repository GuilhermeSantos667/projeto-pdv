create database projeto_dbet02;

create table usuarios(

id serial primary key,
nome text not null,
email text not null unique,
senha text not null
);
create table categorias(

id serial primary key,
descricao text not null

);


create table produtos(
id serial primary key,
descricao text ,
quantidade_estoque text not null,
valor int not null,
categoria_id int references categorias(id),
produto_imagem text
);

create table clientes (  
id serial primary key,
nome text not null,
email text not null unique,
cpf text not null unique,
cep text,
rua text,
numero text,
bairro text,
cidade text,
estado text
);

create table pedidos(
id serial primary key,
cliente_id int references clientes(id) ,
observacao text,
valor_total int not null
);
create table pedido_produtos(
id serial primary key,
pedido_id int references pedidos(id) ,
produto_id int references produtos(id),
quantidade_produto text not null,
valor_produto int not null
);

