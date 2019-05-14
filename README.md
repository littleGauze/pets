# Pets

  前些天看到一个有趣的网站，提供猫咪和狗狗图片的api：
  - cat [https://thecatapi.com](https://thecatapi.com/)
  - dog [https://thedogapi.com](https://thedogapi.com/)
  
  所以用这个api来练练前端。项目是用vue + vuex开发，适合新手练习参考。
  
  ## 效果
  网站大概长这样
 
  <img src="http://sources.gauze.life/pets/pets1.jpg" width="200"> <img src="http://sources.gauze.life/pets/pets3.jpg" width="200"> <img src="http://sources.gauze.life/pets/pets8.jpg" width="200"><img src="http://sources.gauze.life/pets/pets4.png" width="200">
  
  [Live Demo](http://pets.gauze.life) （请使用手机查看，效果更佳）
  
  ## 配置
  先到上面给的两个api网站上申请apiKey，然后配置到项目中即可，并修改本地服务器地址：
  > src/config.js
  ```js
  const config = module.exports = {}

  // third api info
  config.apiBase = 'https://api.the{prefer}api.com/v1/'
  config.apiKeys = { // change to your keys
    cat: 'xxx-xxx-xxx',
    dog: 'xxx-xxx-xxx'
  }

  // local server
  if (process.env.NODE_ENV === 'production') {
    config.serverBase = 'http://pets-server.xx.xx/' // replace with your pets-server address
  } else {
    config.serverBase = 'http://localhost:7001/'
  }

  ```
  
  ## 服务端
   服务端主要使用egg开发，地址在这里 [pets-server](https://github.com/littleGauze/pets-server)
