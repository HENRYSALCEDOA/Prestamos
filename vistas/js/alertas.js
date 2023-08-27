const formularios_ajax = document.querySelectorAll(".FormularioAjax");

/* https://www.youtube.com/watch?v=Cu8S1Mz3G2M&list=PLH_tVOsiVGzmn89QxjFTCE19rLSDqG03U&index=17*/

function enviar_formulario_ajax(e){
	e.preventDefault();

	let data= new FormData(this);
	let method = this.getAttribute("method");
	let action = this.getAttribute("action");
	let tipo = this.getAttribute("data-form");

	let encabezados = new Headers();

	let config={
		method: method,
		headers: encabezados,
		mode: 'cors',
		cache: 'no-cache',
		body: data
	}

	let texto_alerta;

	if (tipo==='save'){
		texto_alerta="Los datos serán guardados en el sistema";
	}else if(tipo==='delete'){
		texto_alerta="Los datos serán eliminados completamente del sistema";
	}else if(tipo==='update'){
		texto_alerta="Los datos del sistema será actualizados";
	}else if(tipo==='search'){
		texto_alerta="Se eliminará el término de búsqueda y tedrás que escribir uno nuevo";
	}else if(tipo==='loans'){
		texto_alerta="Desea remover losd artos?";
	}else {
		texto_alerta="Quieres realizar la operación solicitada?";
	}

	Swal.fire({
		title: 'Estás seguro?',
		text: texto_alerta,
		type: 'question',
		showCancelButton:true,
		confirmButtonColor:'#3085d6',
		cancelButtonColor:'#d33',
		confirmButtonText:'Aceptar',
		cancelButtonText:'Cancelar'
	}).then((result) => {
	if (result.isConfirmed) {
		/*enviar elformulario*/
		fetch(action,config)
		.then(respuesta => respuesta.json())
		.then(respuesta => {
			return alertas_ajax(respuesta);
		});
	}
	});	

}

formularios_ajax.forEach(formularios => {
	formularios.addEventListener("submit",enviar_formulario_ajax);
});

/* CURSO mi primer SISTEMA [PHP, MVC, MYSQL & POO] - 16 Funciones JavaScript (parte 2) 
   https://www.youtube.com/watch?v=HTKv_0zxUNc&list=PLH_tVOsiVGzmn89QxjFTCE19rLSDqG03U&index=19*/
function alertas_ajax(alerta){
	if (alerta.Alerta==="simple"){
		Swal.fire({
	 		title: alerta.Titulo,
	  		text: alerta.Texto,
	  		type: alerta.Tipo,
	  		confirmButtonText:'Aceptar'
  		});
	}else if (alerta.Alerta==="recargar") {
		Swal.fire({
	 		title: alerta.Titulo,
	  		text: alerta.Texto,
	  		type: alerta.Tipo,
	  		confirmButtonText:'Aceptar'
		}).then((result) => {
		  if (result.isConfirmed) {
		  	location.reload();
		  }
		});
	}else if (alerta.Alerta==="limpiar") {
		Swal.fire({
	 		title: alerta.Titulo,
	  		text: alerta.Texto,
	  		type: alerta.Tipo,
	  		confirmButtonText:'Aceptar'
		}).then((result) => {
		  if (result.isConfirmed) {
		  	document.querySelector(".FormularioAjax").reset();
		  }
		});		
	}else if (alerta.Alerta==="redireccionar") {
		window.location.href=alerta.URL;
	}
}