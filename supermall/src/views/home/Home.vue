<template>
  <!--  <router-view>-->
  <!--  </router-view>-->
  <div class="home">
    <navbar class="nav-home">
      <div slot="center">购物街</div>
    </navbar>
   <scroll>
    <home-swiper :banner="banner"/>
    <recommand-view :recommands="recommend"/>
    <feature-view/>
    <!-- @tabClick  后面是不能加()的 不然undefined  -->
    <tab-control :titles="['流行','新款','精选']"  @tabClick="tabClick"/>
    <goods-list :goods="showGoods"/>
   </scroll>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
<!--      <li>11</li>-->
<!--      <li>12</li>-->
<!--      <li>13</li>-->
<!--      <li>14</li>-->
<!--      <li>15</li>-->
<!--      <li>16</li>-->
<!--      <li>17</li>-->
<!--      <li>18</li>-->
<!--      <li>19</li>-->
<!--      <li>20</li>-->
<!--      <li>21</li>-->
<!--      <li>22</li>-->
<!--      <li>23</li>-->
<!--      <li>24</li>-->
<!--      <li>25</li>-->
<!--      <li>26</li>-->
<!--      <li>27</li>-->
<!--      <li>28</li>-->
<!--      <li>29</li>-->
<!--      <li>30</li>-->
<!--      <li>31</li>-->
<!--      <li>32</li>-->
<!--      <li>33</li>-->
<!--      <li>34</li>-->
<!--      <li>35</li>-->
<!--      <li>36</li>-->
<!--      <li>37</li>-->
<!--      <li>38</li>-->
<!--      <li>39</li>-->
<!--      <li>40</li>-->
<!--      <li>41</li>-->
<!--      <li>42</li>-->
<!--      <li>43</li>-->
<!--      <li>44</li>-->
<!--      <li>45</li>-->
<!--      <li>46</li>-->
<!--      <li>47</li>-->
<!--      <li>48</li>-->
<!--      <li>49</li>-->
<!--      <li>50</li>-->
<!--      <li>51</li>-->
<!--      <li>52</li>-->
<!--      <li>53</li>-->
<!--      <li>54</li>-->
<!--      <li>55</li>-->
<!--      <li>56</li>-->
<!--      <li>57</li>-->
<!--      <li>58</li>-->
<!--      <li>59</li>-->
<!--      <li>60</li>-->
<!--      <li>61</li>-->
<!--      <li>62</li>-->
<!--      <li>63</li>-->
<!--      <li>64</li>-->
<!--      <li>65</li>-->
<!--      <li>66</li>-->
<!--      <li>67</li>-->
<!--      <li>68</li>-->
<!--      <li>69</li>-->
<!--      <li>70</li>-->
<!--      <li>71</li>-->
<!--      <li>72</li>-->
<!--      <li>73</li>-->
<!--      <li>74</li>-->
<!--      <li>75</li>-->
<!--      <li>76</li>-->
<!--      <li>77</li>-->
<!--      <li>78</li>-->
<!--      <li>79</li>-->
<!--      <li>80</li>-->
<!--      <li>81</li>-->
<!--      <li>82</li>-->
<!--      <li>83</li>-->
<!--      <li>84</li>-->
<!--      <li>85</li>-->
<!--      <li>86</li>-->
<!--      <li>87</li>-->
<!--      <li>88</li>-->
<!--      <li>89</li>-->
<!--      <li>90</li>-->
<!--      <li>91</li>-->
<!--      <li>92</li>-->
<!--      <li>93</li>-->
<!--      <li>94</li>-->
<!--      <li>95</li>-->
<!--      <li>96</li>-->
<!--      <li>97</li>-->
<!--      <li>98</li>-->
<!--      <li>99</li>-->
<!--      <li>100</li>-->
    </ul>
  </div>


  <!--  <div>home</div>-->
</template>

<script>

import Navbar from "@/components/common/navbar/Navbar";
import {getHomeData, getHomeMultiData} from "@/network/home";

import HomeSwiper from "@/views/home/childComponents/HomeSwiper";
import RecommandView from "@/views/home/childComponents/RecommandView";
import FeatureView from "@/views/home/childComponents/FeatureView";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "Home",
  components: {
    Scroll,
    GoodsList,
    TabControl,
    Navbar,
    HomeSwiper,
    FeatureView,
    RecommandView
  },

  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        //这个名字不能随便取，还能做数组下标的骚操作
        pop: {
          page: 0,
          list: []
        },
        new: {
          page: 0,
          list: []
        },
        sell: {
          page: 0,
          list: []
        }
      },
      currentType:"pop"
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  methods: {
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        console.log(res)
        //可以做一些细化
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    },
    getHomeData(type) {
      const page=this.goods[type].page+1
      getHomeData(type, page).then(res => {
        console.log(res)
         //还可以这样写，非常的神奇
         //data里面的名字不能随便取，还能做数组下标的骚操作
         this.goods[type].list.push(...res.data.list)
         this.goods[type].page+=1
      })
    },
    tabClick(index) {
      switch (index){
        case 0:
          this.currentType="pop"
          break
        case 1:
          this.currentType="new"
          break
        case 2:
          this.currentType="sell"
          break
      }
    }
  },
  created() {
    this.getHomeMultiData()
    this.getHomeData('pop')
    this.getHomeData('new')
    this.getHomeData('sell')
  }
}
</script>

<style scoped>
.nav-home {
  background-color: var(--color-tint);
  color: white;
}

.home {
  margin-top: 44px;
}

</style>
