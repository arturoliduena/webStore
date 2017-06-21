
$('#newProduct').hide()
let ip = '172.50.1.122'

// $('body').on('click',"#crearNewProduct",function())


///////////////////////////////CREATE --> USUARIO

///////////////////////////////SHOW --> 1 USUARIO

/*
$(".buttonOneUser").click(function(){
   HideAll()
    fetch('http://172.50.1.122:3000/'+this.value)
    .then((resp) => resp.json())
      .then(function(data) {
      return function(data) {
            $('#container').append("<h2>"+data.nombre+"</h2><br>")
            $('#container').append('<div id="prod" class="col-xs-12 col-md-8"></div>')
            $('#container').append('<div id="coment" class="col-xs-6 col-md-4"></div>')
            $('#coment').append('<h3>Comentarios:</h3>')
            $('#prod').append("<img class='img-responsive' src='"+data.imgUrl+"'>")
            $('#prod').append("<h3>Precio: "+data.precio+"</h3>")
            $('#prod').append("<h3>Categoría: </h3>")
            $('#prod').append("<h3>Autor: </h3>")
          if (usuarioLogueado) {
            $('#prod').append('<div class="btn-group" role="group"></div>')
            $('.btn-group').append('<button type="button" class="btn btn-default">Editar</button>')
            $('.btn-group').append('<button type="button" class="btn btn-default">Eliminar</button>')
          }else{
            $('#prod').append('<div id="botonUsr"class="col-sm-6"></div>')
            $('#botonUsr').append('<p><a href="#" class="btn btn-primary buttonOneProduct" role="button">Comprar</a></p>')
            $('.btn-group').append('<button type="button" class="btn btn-default">Eliminar</button>')
          }
        }(data)
      })
      .catch(function(error) {
      console.log(error);
      })
}); */

///////////////////////////////SHOW --> LISTA DE USUARIOS

$("#user").click(function(){
  HideAll()
    function createNode(element) {
        return document.createElement(element);
    }
    function append(parent, el) {
      return parent.appendChild(el);
    }
    fetch('http://172.50.1.122:3000/user')
    .then((resp) => resp.json())
      .then(function(data) {
        return function(data) {
          $('#container').append('<h3>Usuarios:</h3>')    
          for (var i = 0; i < data.length; i++) {
              $('#container').append('<div id="'+i+'"class="thumbnail"></div>')
              $('#'+i).append("<div id='in"+i+"' class='media-body'>")
              $('#in'+i).append("<h2 class='media-heading'>"+data[i].name+"</h2>")
              $('#in'+i).append("<p>$"+data[i].email+"</p>")
              $('#in'+i).append('<p><a name='+data[i].products+' href="#" class="btn btn-primary buttonOneUser" role="button">Ver más</a></p>')
         }
        }(data)
    })
    .catch(function(error) {
     console.log(error);
  })
})

////////////////////////////////////////////CREATE --> PRODUCT & CATEGORIA /////////////////////

$("#buttonNewProduct").click(function(){
  $('#container').empty();
  $('#newCategoria').hide()
  $('#newProduct').show()
    const div = document.getElementById('selectCategorias');
    const url = `http://${ip}:3000/categorias`;
    fetch(url)
    .then((resp) => resp.json())
      .then(function(data) {
      let categorias = data;
      
   console.log(categorias)
      
      return function(categorias) {
          $('#selectCategorias').empty()
         for (var i = 0; i < categorias.length; i++) {
           $('#selectCategorias').append(`<option value="${categorias[i].id}">${categorias[i].nombre}</option>`)         }
        }(categorias)
    })
    .catch(function(error) {
      console.log(error);
    
     })

});

$("#crearCategoria").click(function(){
$('#newCategoria').show()
$('#divCategorias').hide()
});

/////////////////////////////////////////// CREATE --> CATEGORIA /////////////////////////

$("#crearNewCategoria").click(function(){
  console.log($("input[name='nombreCategoria']").val())
  var data = {
              nombre: $("input[name='nombreCategoria']").val(),
              description:$("input[name='descriptionCategoria']").val(),
  }
    $.ajax({
      method: 'POST',
      url: `http://${ip}:3000/newCategoria`,
      data: data,
      success: function(data){
      console.log(data)
            const div = document.getElementById('selectCategorias');
            const url = `http://${ip}:3000/categorias`;
            fetch(url)
            .then((resp) => resp.json())
              .then(function(data) {
              let categorias = data;
              
           console.log(categorias)
              
              return function(categorias) {
                $('#selectCategorias').empty()
                 for (var i = 0; i < categorias.length; i++) {
                   $('#selectCategorias').append(`<option value="${categorias[i].id}">${categorias[i].nombre}</option>`)
                 }
                $('#selectCategorias').val($("input[name='nombreCategoria']").val())
                }(categorias)
            })
            .catch(function(error) {
              console.log(error);           
     })
      }
    })
    $('#newCategoria').hide()
    $('#divCategorias').show()
});

function HideAll(){
  $('#containerUsr').empty()
  $('#newProduct').hide()
  $('#container').empty()
}


$("#crearNewProduct").click(function(){
  var data = {
              nombre: $("input[name='nombre']").val(),
              imgUrl: $("input[name='imgUrl']").val(),
              description:$("input[name='description']").val(),
              precio:$("input[name='precio']").val(),
              id_categoria: $('#selectCategorias').val()
  }
  console.log(data)
    $.ajax({
      method: 'POST',
      url: `http://${ip}:3000/newProduct`,
      data: data,
      success: function(data){
        $("input[name='nombre']").val('');
        $("input[name='imgUrl']").val('');
        $("input[name='description']").val('');
        $("input[name='precio']").val('');
        console.log(data);
      }
    })
});

//////////////////////////////////////////// SHOW --> ALL PRODUCTS ///////////////////


$("#buttonProducts").click(function(){
  
   HideAll()

    fetch(`http://${ip}:3000/categorias`)
    .then((resp) => resp.json())
      .then(function(categoria) {

           fetch(`http://${ip}:3000/products`)
            .then((resp) => resp.json())
              .then(function(data) {

          console.log(data)
          return function(data, categoria) {
             console.log(categoria)
            for (var j = 0; j < categoria.length; j++) {
              console.log(categoria[j])
              $('#container').append(`<div id='j${j}'></div>`)
              $(`#j${j}`).append(`<div class="page-header clear"><h1>${categoria[j].nombre} <small>${categoria[j].description}</small></h1></div>`)
              $(`#j${j}`).append(`<div class='row${j}'></div>`)
              
                 for (var i = 0; i < data.length; i++) {
                   console.log(data[i].id_categoria)
                   if (data[i].id_categoria==categoria[j].id) {
                    console.log(categoria[j].id)

                    $(`.row${j}`).append("<div id='"+i+"' class='col-sm-6 col-md-4'></div>")
                    $('#'+i).append("<div id='a"+i+"' class='thumbnail'></div>")
                    $('#a'+i).append("<div id='b"+i+"' style='height:120px' class='divCentrado'></div>")
                    $('#b'+i).append('<img class="img" src='+data[i].imgUrl+'>')
                    $('#a'+i).append("<div id='c"+i+"'class='caption'>")
                    $('#c'+i).append("<h3>"+data[i].nombre+"</h3>")
                    $('#c'+i).append("<p>$"+data[i].precio+"</p>")
                    $('#c'+i).append('<p><a name='+data[i].id+' href="#" class="btn btn-primary buttonOneProduct" role="button">Ver más</a></p>')
                    $('#a'+i).append(`<button type="button" value='${data[i].id}' class="btn btn-default eliminarProduct" aria-label="Left Align"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>`)
            }              
         }
        }
        $(".eliminarProduct").on('click', function(){
          let id_product = this.value;
          $.ajax({
            method: 'POST',
            url: `http://${ip}:3000/eliminarProduct`,
            data: {id: id_product},
            success: function(data){
            console.log(data)
      }
    })
        })
      }(data, categoria)

      })
      .catch(function(error) {
      console.log(error);
      })
    })
});




////////////////////////////////////////////SHOW --> 1 CATEGORIA

////////////////////////////////////////////SHOW --> LISTA DE CATEGORIAS