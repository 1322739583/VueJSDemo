export const getAssetsUrl=(imgUrl)=>{
  return new URL(`/src/assets/img/${imgUrl}`, import.meta.url).href;
}