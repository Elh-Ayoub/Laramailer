/* 
    Show selected image befor updating
*/
function readImage(input) {
    if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
              $('#profile-pic').attr('src', e.target.result);
          }
          reader.readAsDataURL(input.files[0]);
      }
}
$("#choosefile").change(function(){
    readImage(this);
});

/*
    Set onClick event to submit profile form
*/
$('#SubmitInfoForm').click(function(){
    $('#infoForm').submit();
})
