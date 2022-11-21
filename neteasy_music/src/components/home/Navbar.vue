<template>
  <div class="home">
    <div class="nav">
      <div class="nav_wrapper">
        <div class="nav_left">
          <a class="logo" href="#"><h1 >网页云音乐</h1></a>
          <ul class="nav_menu">
            <li><a href="">发现音乐<span class="menu_arrow"></span></a></li>
            <li><a href="">我的音乐<span></span></a></li>
            <li><a href="">关注<span></span></a></li>
            <li><a href="">商城<span></span></a></li>
            <li><a href="">音乐人<span></span></a></li>
            <li class="download"><a href="">下载客户端<span></span></a></li>
          </ul>
        </div>
        <div class="nav_right">
           <div class="search">
             <div class="search_bg">
               <input type="search" placeholder="音乐/视频/电台/用户"/>
             </div>
           </div>
           <a class="creater_cneter" href="">创作者中心</a>
           <a class="login" href="">登录</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Navbar',

}
</script>

<style  scoped>
.nav{
  height: 70px;
  background: #242424;
}
.nav_wrapper{
  display: flex;
  justify-content: space-between;
  width: 1100px;
  height: 100%;
  margin: 0 402px;
}
.nav_left{
  display: flex;
  align-items: center;
  line-height: 70px;
  /*background: lightgreen;*/
}

.nav_right{
  height: 100%;
  line-height: 70px;
  /*background: lightblue;*/
}

.logo{
  display: flex;
  align-items: center;
  width: 157px;
  height: 70px;
  margin-right: 19px;
}

.logo h1{
  background: url('../../assets/img/home/home_sprite.png') no-repeat 0 -19px;
  height: 33px;
  width: 157px;
  text-indent: -9999px;
}

.nav_menu{
  display: flex;
  align-items: center;
  font-size: 14px;
}

.nav_menu li a{
  display: inline-block;
  position: relative;
  height: 100%;
  padding: 0 19px;
  color: #ccc;
}

.nav_menu li a:hover{
  color: #fff;
}

.nav_menu li:hover{
  background: #000000;
}

.menu_arrow{
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%,-100%);
  width: 12px;
  height: 6px;
  background: url('../../assets/img/home/home_sprite.png') no-repeat -226px 0;
}

.download span{
  display: inline-block;
  position: absolute;
  top: 20px;
  background: url('../../assets/img/home/home_sprite.png') no-repeat -192px 0;
  width: 26px;
  height: 13px;
  margin-left: 13px;
}

.search{
  display: flex;
  align-items: center;
  width: 158px;
  height: 32px;
  border-radius: 16px;
  background: white;
  border: 1px solid #ccc;
}
.search_bg{
  display: flex;
  box-sizing: border-box;
  background: url('../../assets/img/home/home_sprite.png') no-repeat -10px -108px;
  margin-left: 10px;
}
.search_bg input{
  height: 16px;
  width: 122px;
  margin-left: 20px;
  font-size: 12px;
  line-height: 16px;
  border: none;
  outline: none;
}



.nav_right{
  display: flex;
  align-items: center;
}

.creater_cneter{
  display: inline-block;
  width: 90px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 16px;
  font-size: 12px;
  margin-left: 12px;
  color: #ccc;
  border: 1px solid #4F4F4F;
}

.creater_cneter:hover{
  border-color: white;
  color: white;
}
.login{
  margin-left: 10px;
  color: #787878;
  font-size: 12px;
}
.login:hover{
  color: #666;
  text-decoration: underline;
}


</style>
