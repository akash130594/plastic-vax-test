import React from 'react'
import CMS from 'netlify-cms-app'
import './cms-utils'
import loadable from '@loadable/component'
// import { ContactPageTemplate } from '../templates/ContactPage'

// import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary';

const HomePage = loadable(() => import('../templates/HomePage'))
const SinglePost = loadable(() => import('../templates/SinglePost'))

// CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

if (
  window.location.hostname === 'localhost' &&
  window.localStorage.getItem('netlifySiteURL')
) {
  CMS.registerPreviewStyle(
    window.localStorage.getItem('netlifySiteURL') + '/styles.css'
  )
} else {
  CMS.registerPreviewStyle('/styles.css')
}

CMS.registerPreviewTemplate('home-page', ({ entry }) => (
  <HomePage {...entry.toJS().data} />
))
// CMS.registerPreviewTemplate('contact-page', ({ entry }) => (
//   <ContactPageTemplate {...entry.toJS().data} />
// ))
// CMS.registerPreviewTemplate('blog-page', ({ entry }) => (
//   <BlogIndexTemplate {...entry.toJS().data} />
// ))
CMS.registerPreviewTemplate('posts', ({ entry }) => (
  <SinglePost {...entry.toJS().data} />
))

