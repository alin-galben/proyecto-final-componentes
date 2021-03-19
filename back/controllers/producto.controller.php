<?php

class ProductoController {

  private $db = null;

  function __construct($conexion) {
    $this->db = $conexion;
  }

  public function obtenerProductos() {
    $sql_productos = "SELECT * FROM productos";
    if (!$result = $this->db->query($sql_productos)) {
        http_response_code(400);
        exit(json_encode(["error" => "Error de conexion"]));
    }
    $peticion = $this->db->prepare($sql_productos);
    $peticion->execute();
    $resultado = $peticion->fetchAll(PDO::FETCH_OBJ);
    exit(json_encode($resultado));
  }
  
  public function insertarProducto() {
    $producto = json_decode(file_get_contents("php://input"));

    if(!isset($producto->tipo) || !isset($producto->precio) || !isset($producto->nombre) || !isset($producto->descripcion)) {
      http_response_code(400);
      exit(json_encode(["error" => "No se han enviado todos los parametros"]));
    }

    $peticion = $this->db->prepare("INSERT INTO productos (tipo, precio, nombre, descripcion) VALUES (?,?,?,?)");
    $peticion->execute([$producto->nombre,$producto->precio,$producto->descripcion,$producto->tipo]);
    exit(json_encode("Producto insertado correctamente"));
  }

}