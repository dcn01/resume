<template>
  <div class="new-wrapper">
    <header-title></header-title>
    <div>
      <el-input
        class="hehe"
        placeholder="请输入文章标题"
        v-model="title"
        maxlength="50"
        show-word-limit
        clearable
      ></el-input>
    </div>
    <div>
      <quill-editor
        class="editor"
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @ready="onEditorReady($event)"
      ></quill-editor>
      <!-- <Myupload @successFile="successFile"></Myupload> -->
      <div class="btns">
        <el-button v-show="content" type="info" @click="content = ''">清空内容</el-button>
        <el-button type="primary" v-if="$route.query.blogId" @click="updateContent">更新</el-button>
        <el-button type="primary" v-else @click="commitContent">发布</el-button>
      </div>
    </div>
  </div>
</template>
<script>
// require styles
import 'quill/dist/quill.snow.css'
import HeaderTitle from '../../../src/components/HeaderTitle'
import { commitContent, getBlogContent, updateContent } from '../../request/api/blog'
import message from '../../utils/message'
import messageBox from '../../utils/messageBox'
import { quillEditor, Quill } from 'vue-quill-editor'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', ImageResize)
const toolbar = [
  [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
  ['blockquote', 'code-block'], //引用，代码块
  ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线

  [{ list: 'ordered' }, { list: 'bullet' }], //列表
  //[{ script: 'sub' }, { script: 'super' }], // 上下标
  [{ indent: '-1' }, { indent: '+1' }], // 缩进
  [{ direction: 'rtl' }], // 文本方向

  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题

  [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
  //[{ font: [] }], //字体
  [{ align: [] }], //对齐方式

  ['clean'], //清除字体样式
  ['image', 'link'] //上传图片、上传视频8
]
export default {
  components: {
    HeaderTitle,
    quillEditor
  },
  data() {
    return {
      content: '',
      title: '',
      filePath: '',
      editorOption: {
        placeholder: '请输入文章内容...',
        modules: {
          toolbar: {
            container: toolbar
            // handlers: {
            //   'image': (value) => {
            //     if (value) {
            //       document.querySelector('.avatar-uploader input').click()
            //     } else {
            //       this.editor.format('image', false);
            //     }
            //   }
            // }
          },
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          }
        },
        theme: 'snow'
      }
    }
  },
  async mounted() {
    await this.getBlogContent()
  },
  methods: {
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange({ quill, html, text }) {
      //console.log('editor change!', quill, html, text)
      this.content = html
    },
    async commitContent() {
      if(!this.userInfo) {
        await messageBox('系统检测当前未登录，是否前往登录？', '当前未登录', {
          distinguishCancelAndClose: true,
          confirmButtonText: '登录',
          cancelButtonText: '取消'
        }).then(() => {
          const pathname = window.location.hash.substr(2)
          this.$router.push({
            path: '/login',
            query: {
              pathname
            }
          })
        }).catch(() => false)
        return
      }
      if(!this.title) {
        message(true, '请填写博客标题', 'error')
        return
      }
      if(!this.content) {
         message(true, '请填写博客内容', 'error')
        return
      }
      const userId = this.userInfo.id
      const userName = this.userInfo.userName
      const phone = this.userInfo.phone
      const title = this.title
      const content = this.content
      const result = await commitContent(
        '/api/blog/commitContent',
        {
          userId,
          userName,
          phone,
          title,
          content
        }
      )
      if(result.errno === 0) {
        message(true, '发表成功', 'success')
        this.title = ''
        this.content = ''
        this.$router.push('/log')
        return
      }
    },
    async getBlogContent() {
      const blogId = this.$route.query.blogId
      if(!blogId) {
        return
      }
      const result = await getBlogContent(
        '/api/blog/getBlogContent',
        { blogId }
      )
      if(result.errno === 0) {
        this.title = result.data.title
        this.content = result.data.content
      }
    },
    async updateContent() {
      if(!this.userInfo) {
        await messageBox('系统检测当前未登录，是否前往登录？', '当前未登录', {
          distinguishCancelAndClose: true,
          confirmButtonText: '登录',
          cancelButtonText: '取消'
        }).then(() => {
          this.$router.push('/login')
        }).catch(() => false)
        return
      }
      if(!this.title) {
        message(true, '请填写博客标题', 'error')
        return
      }
      if(!this.content) {
         message(true, '请填写博客内容', 'error')
        return
      }
      const blogId = this.$route.query.blogId
      const title = this.title
      const content = this.content
      const result = await updateContent(
        '/api/blog/updateContent',
        {
          blogId,
          title,
          content
        }
      )
      if(result.errno === 0) {
        message(true, '更新成功', 'success')
        this.$router.push('/log')
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    },
    userInfo() {
      if (this.$store.getters.getUserInfo) {
        return this.$store.getters.getUserInfo
      }
      return null
    }
  }
}
</script>
<style>
.new-wrapper {
  margin: 0 24px 40px 24px;
  background: url('../../assets/images/palm-leaf.png');
  box-shadow: 0 5px 20px #666;
}
.hehe > input {
  border-radius: 0px;
  height: 40px !important;
  font-size: 14px;
}
.btns {
  padding: 20px 10px;
  box-sizing: border-box;
  text-align: right;
}
.avatar-uploader {
  display: none;
}
/* .hehe > input:focus {
  border: 1px solid #f5f5f5;
}
.hehe > input:hover {
   border: 1px solid #f5f5f5;
} */
.editor {
  line-height: normal !important;
  background: #fff;
}
.ql-editor {
  min-height: 300px;
}
.ql-snow .ql-tooltip[data-mode='link']::before {
  content: '请输入链接地址:';
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: '保存';
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode='video']::before {
  content: '请输入视频地址:';
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
  content: '10px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
  content: '18px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
  content: '32px';
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
  content: '标题1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
  content: '标题2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
  content: '标题3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
  content: '标题4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
  content: '标题5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
  content: '标题6';
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
  content: '衬线字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
  content: '等宽字体';
}
</style>