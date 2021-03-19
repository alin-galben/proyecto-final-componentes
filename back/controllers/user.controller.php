<?php

use \Firebase\JWT\JWT;

class UserController {

  private $db = null;

  function __construct($conexion) {
    $this->db = $conexion;
  }

  public function hacerLogin() {
    //Se obtienen los datos recibidos en la peticion.
    $user = json_decode(file_get_contents("php://input"));

    if(!isset($user->email) || !isset($user->password)) {
      http_response_code(400);
      exit(json_encode(["error" => "No se han enviado todos los parametros"]));
    }
  
    //Primero busca si existe el usuario, si existe que obtener el id y la password.
    $peticion = $this->db->prepare("SELECT id,password FROM usuarios WHERE email = ?");
    $peticion->execute([$user->email]);
    $resultado = $peticion->fetchObject();
  
    if($resultado) {
  
      //Si existe un usuario con ese email comprobamos que la contraseña sea correcta.
      if(password_verify($user->password, $resultado->password)) {
  
        //Preparamos el token.
        $iat = time();
        $exp = $iat + 3600*24*2;
        $token = array(
          "id" => $resultado->id,
          "iat" => $iat,
          "exp" => $exp
        );
  
        //Calculamos el token JWT y lo devolvemos.
        $jwt = JWT::encode($token, CJWT);
        http_response_code(200);
        exit(json_encode($jwt));
  
      } else {
        http_response_code(401);
        exit(json_encode(["error" => "Email o contraseña incorrectos"]));
      }
  
    } else {
      http_response_code(404);
      exit(json_encode(["error" => "Email o contraseña incorrectos"]));  
    }
  }

  public function registrarUser() {
    //Guardamos los parametros de la petición.
    $user = json_decode(file_get_contents("php://input"));

    //Comprobamos que los datos sean consistentes.
    if(!isset($user->email) || !isset($user->password)) {
      http_response_code(400);
      exit(json_encode(["error" => "Email o contraseña incorrectos"]));

    }

    //Comprueba que no exista otro usuario con el mismo email.
    $peticion = $this->db->prepare("SELECT id FROM usuarios WHERE email=?");
    $peticion->execute([$user->email]);
    $resultado = $peticion->fetchObject();
    if(!$resultado) {
      $password = password_hash($user->password, PASSWORD_BCRYPT);
      $eval = "INSERT INTO usuarios (email, password) VALUES (?,?)";
      $peticion = $this->db->prepare($eval);
      $peticion->execute([
        $user->email, $password
      ]);
      
      //Preparamos el token.
      $id = $this->db->lastInsertId();
      $iat = time();
      $exp = $iat + 3600*24*2;
      $token = array(
        "id" => $id,
        "iat" => $iat,
        "exp" => $exp
      );

      //Calculamos el token JWT y lo devolvemos.
      $jwt = JWT::encode($token, CJWT);
      http_response_code(201);
      echo json_encode($jwt);
    } else {
      http_response_code(409);
      echo json_encode(["error" => "Este email ya esta registrado"]);
    }
  }
}