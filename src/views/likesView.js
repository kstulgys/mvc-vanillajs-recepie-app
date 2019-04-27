import { elements } from './DOMelements'

export const renderLikeBtn = isLiked => {
  const icon = isLiked
    ? '<i class="far fa-heart fa-2x"></i>'
    : ` <i class="far fa-heart"></i>`
  document.querySelector('.header__likes').innerHTML = icon
}

export const renderLike = like => {
  const markup = `
    <li>
        <a class="likes__link" href=#${like.id}>
            <figure class="likes__fig">
                <img src=${like.image} alt="Test">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${like.title}</h4>
                <p class="likes__author">The Pioneer Woman</p>
            </div>
        </a>
    </li>`
  elements.likedList.insertAdjacentHTML('beforeEnd', markup)
}

export const deleteLike = id => {
  const el = document.querySelector(`.likes__link[href*="${id}"]`)
  if (el) {
    el.parentElement.removeChild(el)
  }
}
