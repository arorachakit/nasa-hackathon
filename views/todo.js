// $("#todo ul").on("click", "#todo li",  function(){
// 	$(this).toggleClass("done");
// });
// $("#todo ul").on("click", "span", function(event){
// 	$(this).parent().fadeOut(500, function(){
// 		$(this).remove();
// 	})
// 	event.stopPropagation();
// });
// $("#todo input[type='text']").on("keypress", function(event){
// 	if(event.which === 13){
// 		var todoText = $(this).val();
// 		$(this).val(null);
// 		$("#todo ul").append("<li><span> <i class='fa fa-trash'></i> </span> " + todoText + "</li>")
// 	}
// })
// $("#todo .fa-plus").on("click", function(){
// 	$("#todo input").fadeToggle();
// })