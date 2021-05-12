function createImages() {
  var elements = document.querySelectorAll('.acf-input label.selected input'),
    spinner = document.querySelector('.create-images-block > .spinner'),
    success = document.querySelector('.create-images-block > .success'),
    postID = document.querySelector('.compat-attachment-fields #_acf_post_id').value,
    xhr = new XMLHttpRequest(),
    formData = new FormData(),
    response;


  spinner.classList.add('is-active');

  formData.append('action', 'create_images');
  formData.append('id', postID);

  for (var i = 0, len = elements.length; i < len; i++) {
    formData.append(elements[i].value, true);
  }

  xhr.open('POST', siteUrl + '/wp-admin/admin-ajax.php')
  xhr.send(formData);

  xhr.addEventListener('readystatechange', function() {
    if (xhr.status === 200 && xhr.readyState === 4) {

      spinner.classList.remove('is-active');
      spinner.classList.add('hidden');
      success.classList.remove('hidden');

      try {
        response = JSON.parse(xhr.response)
      } catch (err) {
        console.log(err);
        console.log(xhr.response);
        return;
      }

      for (var key in response) {
        // document.querySelector('tr[data-name="' + key + '"] input').setAttribute('placeholder', response[key]);
        document.querySelector('tr[data-name="' + key + '"] input').setAttribute('value', response[key]);
      }

      setTimeout(function() {
        success.classList.add('hidden');
      }, 5000);
    }
  });
}