
<?php
	
	class vistasModelo{

		/*--------- Modelo obtener vistas ---------*/
		protected static function obtener_vistas_modelo($vistas){
			$listaBlanca=["home","client-list","client-search","client-update",
			"company","home","item-list","item-new","item-search","client-update",
			"reservation-pending","reservation-search","reservation-update",
			"user-list","reservation-reservation","user-new","user-search",
			"user-update","client-new","reservation-list","reservation-new"];
			if(in_array($vistas, $listaBlanca)){
				if(is_file("./vistas/contenidos/".$vistas."-view.php")){
					$contenido="./vistas/contenidos/".$vistas."-view.php";
				}else{
					$contenido="404";
				}
			}elseif($vistas=="login" || $vistas=="index"){
				$contenido="login";
			}else{
				$contenido="404";
			}
			return $contenido;
		}
	}