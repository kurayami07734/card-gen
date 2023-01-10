<script>

</script>

<main>
    <nav class="main-nav">
        <input type="checkbox" id="check" />
        <label for="check" class="menu-btn">
          <i class="fas fa-bars"></i>
        </label>
        <a href="index.html" class="logo">RESET</a>
        <a href="index.html" class="logo">UNDO</a>
        <a href="index.html" class="logo">REDO</a>
        <a href="index.html" class="logo">DELETE</a>
        <ul class="navlinks">
          <li><a href="">LAYERS</a></li>
          <li><a href="#">OPACITY</a></li>
          <li><a href="#">FILTERS</a></li>
          <li><a href="#">DUPLICATE</a></li>
        </ul>
      </nav>
      <hr size =0.6 width="100%" color=blue>  
</main>

<style>

main{
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  /* background-color: black; */

  
}

header {
  /* background-color: black; */

}

.main-nav {
  height: 20px;
}

.logo {
 color:white;
  line-height: 60px;
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  margin-left: 25px;
  font-family: "AstroSpace", sans-serif;
}

.navlinks {
  list-style: none;
  float: right;
  line-height: 60px;
  margin: 0;
  padding: 0;
}

.navlinks li {
  display: inline-block;
  margin: 0px 20px;
}

.navlinks li a {
 color: white;
/* text-fill-color: transparent; */

  /* color: white; */
  text-decoration: none;
  font-size: 15px;
  transition: all 0.3s linear 0s;
  text-transform: uppercase;
 
}

.navlinks li a:hover {
  /* color: #7ebcb9; */
background: linear-gradient(180deg, rgba(170, 188, 204, 0) 0%, rgba(41, 90, 215, 0.97) 25%, rgba(41, 173, 215, 0.97) 58.85%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
  padding-bottom: 7px;
  
}

/* li a.contact {
  background-color: #00adb5;
  padding: 9px 20px;
  border-radius: 50px;
  transition: all 0.3s ease 0s;
  border-bottom: none;
} */
/* 
li a.contact:hover {
  background: linear-gradient(180deg, rgba(170, 188, 204, 0) 0%, rgba(41, 90, 215, 0.97) 25%, rgba(41, 173, 215, 0.97) 58.85%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;;
  /* color: white; */
  /* border-bottom: none;
} */ 

#check {
  display: none;
}

.menu-btn {
  font-size: 25px;
  color: white;
  float: right;
  line-height: 75px;
  margin-right: 30px;
  display: none;
  cursor: pointer;
}

@media (max-width: 800px) {
  .navlinks {
    position: fixed;
    width: 100%;
    height: 100vh;
    text-align: center;
    transition: all 0.5s;
    right: -100%;
    background: black;
  }

  .navlinks li {
    display: block;
  }

  .navlinks li a {
    font-size: 20px;
  }

  .navlinks li a:hover {
    border-bottom: none;
  }

  .menu-btn {
    display: block;
  }

  #check:checked ~ .navlinks {
    right: 0;
  }
}

@media (max-width: 360px) {
  .logo {
    margin-left: 5px;
    font-size: 20px;
  }

  .menu-btn {
    margin-right: 5px;
    font-size: 20px;
  }

  .menu-btn:focus {
    color: blue;
  }
}

</style>