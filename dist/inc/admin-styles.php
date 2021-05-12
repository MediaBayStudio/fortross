<?php
// Для уменьшения webp в картинках
add_action( 'admin_head', function() {
  print
  '<style>
    /* На странице редактирования медиафайла */
    .compat-attachment-fields tr[data-name="webp"], {
      display: inline-block !important;
      max-width: 33%;
    }
    
    /* Родительская категория на странице редактирования записи */
    #category-all > #categorychecklist > li:not(.popular-category) > label.selectit > input,
    /* Скрытие тексового поля на странице информация о медиафайле */
    tr.acf-field[data-name="create_images"],
    /* Родительский бренд на странице редактирования записи
    #post_tag-all > #post_tagchecklist > li:not(.popular-category) > label.selectit > input,  */
    /* Забыл что это */
    acf-field[data-name="category"] .children.acf-bl,
    /* Забыл что это */
    [data-name="brands"] .children.acf-bl {
      display: none;
    }

    .acf-field[data-name="subcategories"] .acf-checkbox-list > li > label {
      pointer-events: none;
    }
    .acf-field[data-name="subcategories"] .acf-checkbox-list > li > label > input {
      display: none;
    }
    /* Делаем недоступным нажатие на label родительской категории (стр. редактирования товара) */
    #category-all > #categorychecklist > li:not(.popular-category) > label.selectit {
      pointer-events: none;
    }

    /* Растягиваем настройки адаптивности изображений на всю ширину блока (стр с медифайлом) */
    .compat-attachment-fields [data-name="images_variables"] > .acf-input /* ,
    .compat-attachment-fields [data-name="webp"] > .acf-input,
    .compat-attachment-fields [data-name="2x_webp"] > .acf-input,
    .compat-attachment-fields [data-name="2x"] > .acf-input */ {
      width: 100% !important;
    }

    /* Удаляем блок с подписью и блок с описанием для медифайлов (для экономии места) */
    .attachment-info [data-setting="caption"],
    .attachment-info [data-setting="description"] {
      display: none !important;
    }

    /* Уменьшаем размеры приклепляемых изображений (для экономии места) */
    .compat-attachment-fields [data-name="webp"] > .acf-input [data-name="img"],
    .compat-attachment-fields [data-name="2x_webp"] > .acf-input [data-name="img"],
    .compat-attachment-fields [data-name="2x"] > .acf-input [data-name="img"] {
      max-width: 30%;
    }
  </style>';

  print '<script>
  document.addEventListener("DOMContentLoaded", function() {
    var copyToClipboard = document.querySelector(".copy-to-clipboard-container");
    console.log(copyToClipboard);
if (copyToClipboard) {
  var btn = document.createElement("button");
  btn.setAttribute("type", "button");
  btn.classList.add("generate-images", "button", "button-small");
  btn.textContent = "Создать адаптивные изображения";

  copyToClipboard.insertAdjacentElement("afterend", btn);
}
  });
  </script>';

  // Некоторые стили для страницы редактирования брендов
  if ( $_GET['taxonomy'] === 'post_tag' ) {
    print
    '<script>
    document.addEventListener("ajaxComplete", function() {
  console.log(event);
});
    document.addEventListener("DOMContentLoaded", function() {
      document.querySelector("#custom_permalink_form small").textContent = "Ссылка формируется автоматически только при создании бренда";

        let parentSelect = document.querySelector("[name=parent]"),
          parentVariables = document.querySelectorAll("[name=parent] > option", parentSelect),
          brandPreviewImage = document.querySelector("[data-name=brand_preview] img"),

          ACF = "[data-name=brand_logo], [data-name=brand_country]",

          toggleVisibleACF = function() {
            if (parentVariables.length > 0) {
              parentVariables.forEach(function(option) {

                if (option.selected) {
                  let acfInputs = document.querySelectorAll(ACF);
                  if (option.textContent.toLowerCase() === "нет") {
                    acfInputs.forEach(acfInput => acfInput.style.display = "");
                  } else {
                    acfInputs.forEach(acfInput => acfInput.style.display = "none");
                  }
                }
              });
            }
          };

        brandPreviewImage.style.maxWidth = "250px";

        parentSelect.addEventListener("change", toggleVisibleACF);
        toggleVisibleACF();

        
    });
    </script>';
  }
} );