<template>
  <div class="loginComponent" tabindex="0" @keydown.enter="login">
    <div class="bg">
      <div class="top-content">
        <div class="line"></div>
        <div class="title">
          <!-- <div>{{ $t(loginPlatform | platformNameFilter) }}</div>		错误的写法 -->
					<div>{{$t('label.title')}}</div>
        </div>
      </div>
      <div class="bottom-content">
        <div class="bottom-bg">
          <div class="bottom-banner">
            <img src="../../assets/images/login/default_bg.png">
          </div>
          <div class="login">
            <div class="login-form">
              <div class="login-content">
                <div class="login-title">{{$t('label.login_title')}}</div>
              </div>
              <div class="login-name">
                <div>
                  <i class="fa fa-user"></i>
                </div>
                <input type="text" :placeholder="$t('label.user_name')" v-model="reqUser.username" />
              </div>
              <div class="login-password">
                <div>
                  <i class="fa fa-lock"></i>
                </div>
                <input type="password" :placeholder="$t('label.user_password')" v-model="reqUser.password" />
              </div>
              <div class="login-rememberpwd">
                <input type="checkbox" v-model="cacheAccount.cached" />{{$t('label.remember_account')}}
              </div>
              <div class="login-button">
                <a @click="login">{{$t('label.login')}}</a>
              </div>
              <!-- <div class="link">
                <div>
                  <a @click="joinTrust">{{$t('label.join_trust')}}</a>
                </div>
                <div>
                  <a @click="download">{{$t('label.download_center')}}</a>
                </div>
              </div> -->
              <div class="version">
                <div>{{version}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as CONST from '@/config/const'

export default {
  name: 'login',
  data () {
    return {
			version: CONST.VERSION,
			loginPlatform: '',
			reqUser: {
				username: '',
				password: ''
			},
			cacheAccount: {
				cached: false
			},
			urls: []
    }
	},
	methods: {
		login () {
			if (this.reqUser.username === '' || this.reqUser.password === '') {
				this.showBasicNotify(CONST.loginEmpty)
				return
			}
			let jsonStr = JSON.stringify(this.reqUser)
			let reqJson = this.encode(jsonStr)
			this.$httpPost(CONST.LOGIN, null, {para: reqJson})
				.then(data => {
					let result = data.data
          if (!result.result) {
            this.showBasicNotify(CONST.networkError)
          } else if (result.result === CONST.RESULT.success) {
						let dataJson = this.decode(result.data)
						let loginedUser = JSON.parse(dataJson)
						let userObj = {
							loginedUser: loginedUser,
							reqToken: result.decodeData
						}
						this.$store.dispatch('login', userObj)
						this.$store.dispatch('saveSession', dataJson)
						this.$loadBasicData(loginedUser, true)
					} else {
						let errMessage = ''
            if (result.decodeData === 'out of date')
							errMessage = this.$t('message.out_of_date')
            else
							errMessage = this.$t('message.failed_accout')
            this.$notify({
              type: 'error',
              title: '',
							message: errMessage,
							duraction: 2000
            })
          }
				}).catch(error => {
					if (error)
						this.showBasicNotify(CONST.networkError)
				})
		}
	}
}
</script>

<style lang="scss">
  @import '../../assets/scss/definition.scss';

	.loginComponent{
	  background-color: $login_loginComponent_background_color;
	  padding: 0;
	  margin: 0;
	  width: 100%;
		height: 100%;
		
	  .bg{
	    position: fixed;
	    top: 50%;
	    margin-top: -320px;
	    width: 100%;
			height: 640px;
			
	    .top-content{
	      bottom:0;
	      width: 100%;
	      height: 90px;
	
	      .line {
	        position: relative;
	        top: 50%;
	        width: 100%;
	        height: 1px;
	        border-bottom: 2px solid $login_line_color;
	      }
	
	      .title {
	        position: relative;
	        background-color: $login_title_background_color;
	        padding: 0 31px;
	        float: left;
	        bottom: -5px;
	        width: auto;
	        height: 78px;
	        margin-left: 20%;
	        font-family: $system_font_family_1;
	        font-size: 36px;
	        font-weight: bold;
	        line-height: 78px;
	        color: $login_title_div_color;
	        text-align: center;
	      }
			}
			
	    .bottom-content{
	      background-color: $login_bottom_content_background_color;
	      text-align: center;
	      margin:0 auto;
	      width: 100%;
	      height: 550px;
	
	      .bottom-bg{
	        margin-left: auto;
	        margin-right: auto;
	        width: 1300px;
	        height: 550px;
	
	        .bottom-banner{
	          float: left;
	          width: 855px;
	          height: 100%;
	
	          img {
	            width: 100%;
	            height: 100%;
	          }
	        }
	        .login{
	          position: relative;
	          top: 50%;
	          margin-top: -207px;
	          float: right;
	          background-color: $login_login_background_color;
	          text-align: center;
	          width: 330px;
	          height: 428px;
	
	          .login-form{
	            position: relative;
	            top: 60px;
	            margin-left: auto;
	            margin-right: auto;
	            width: 86%;
	            height: 380px;
	
	            .login-content{
	              text-align: center;
	              width: 100%;
	              height: 32px;
	
	              .login-title{
	                width: auto;
	                height: 22px;
	                text-align: center;
	                font-family: $system_font_family_1;
	                font-size: 22px;
	                line-height: 22px;
	                color: $login_login_login_title;
								}
								
	              .login-subheading{
	                float: left;
	                margin-left: 10px;
	                position: relative;
	                top:5px;
	                width: auto;
	                height: 18px;
	                font-family: $system_font_family_1;
	                font-size: 18px;
	                line-height: 18px;
	                color: $login_login_subheading;
	              }
							}
							
	            .login-name{
	              position: relative;
	              top: 15px;
	              border: 2px solid $login_login_form_border_color;
	              width: 100%;
	              height: 46px;
	
	              div{
	                color: $login_login_form_border_color;
	                font-size: 22px;
	                float: left;
	                line-height: 46px;
	                width: 42px;
	                height: 46px;
								}
								
	              input{
	                border: 0;
	                width: 237px;
	                height: 100%;
	                font-family: $system_font_family_1;
	                font-size: 14px;
	                line-height: 14px;
	                color: $login_login_form_border_color;
	              }
							}
							
	            .login-password{
	              position: relative;
	              top: 40px;
	              border: 2px solid $login_login_form_border_color;
	              width: 100%;
	              height: 46px;
	
	              div{
	                color: $login_login_form_border_color;
	                font-size: 22px;
	                float: left;
	                line-height: 46px;
	                width: 42px;
	                height: 46px;
								}
								
	              input{
	                border: 0;
	                width: 237px;
	                height: 100%;
	                font-family: $system_font_family_1;
	                font-size: 14px;
	                line-height: 14px;
	                color: $login_login_form_border_color;
	              }
							}
							
	            .login-rememberpwd{
	              position: relative;
	              top: 35px;
	              vertical-align: middle;
	              width: 100%;
	              height: 40px;
	              font-family: $system_font_family_1;
	              font-size: 12px;
	              line-height: 48px;
	              color: $login_login_rememberpwd_color;
	              text-align: right;
	
	              input{
	                margin: 0;
	              }
							}
							
	            .login-button{
	              position: relative;
	              top: 40px;
	              width: 100%;
	              height: 48px;
	
	              a{
	                display:block;
	                background-color: $login_login_button_background_color;
	                cursor:pointer;
	                text-decoration: none;
	                width: 100%;
	                height: 100%;
	                line-height: 48px;
	                font-size: 22px;
	                font-family: $system_font_family_1;
	                color: $login_login_button_color;
	              }
	            }
	            // .link{
	            //   position: relative;
	            //   top: 65px;
	            //   width: 100%;
	            //   font-size: 15px;
	
	            //   a:hover{
	            //     cursor: pointer;
	            //   }
	
	            //   div:first-child{
	            //     float: left;
	            //   }
	            //   div:last-child{
	            //     float: right;
	            //   }
	            // }
	            .version{
	              position: relative;
	              top: 95px;
	              width: 100%;
	              height: 12px;
	
	              div{
	                width: 100%;
	                text-align: right;
	                float: right;
	                font-family: $system_font_family_1;
	                font-size: 12px;
	                line-height: 12px;
	                color: $login_login_version_color;
	              }
	            }
	          }
					}
					
	        @media (max-width: 1280px) {
	          .login{
	            right: 100px;
	          }
	        }
	      }
	    }
	  }
	}
</style>
