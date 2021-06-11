---
title: 'Deprecating Sass for Shopify Themes'
date: '2021-06-02'
---
![alt text](https://cdn.shopify.com/s/files/1/0533/2089/files/deprecating-sass_42d3c5b9-7d62-4976-868a-8475aa85349d.jpg?v=1604323638&width=1024)

At Shopify, we're always looking for opportunities to improve the experience of working with themes, both for merchants and our developer community. Recently this has involved a [rebuild of the theme editor in React](https://shopify.dev/changelog/redesign-of-shopify-theme-editor-built-in-react?itcat=partner_blog&itterm=deprecating_sass&shpxid=f85971a4-629C-4E82-FDB5-782620184653), as well as [ending support for IE11](https://www.shopify.com/partners/blog/legacy-browser-support). 

As part of our ongoing initiatives, we've decided to deprecate Sass, with the aim of improving the user experience of storefronts, and paving the way for future advancements. In the short term, Sass will continue to work on Shopify themes, but we are actively migrating our themes to use only CSS stylesheets. 

In this article we'll look at why we've decided to transition away from using Sass in themes and how developers can adjust their custom themes to adopt native CSS features and maintain functionality. We'll also look at what alternatives are available for developers who wish to continue using Sass in their development workflow. 

# Disadvantages of Sass

There are a number of reasons why we have decided to transition away from using Sass on Shopify themes. One of the main problems partners experience working with Sass on Shopify is that many modern features are unavailable since we are using a legacy version. Updating to a current version of Sass would result in a [breaking change to themes](https://sass-lang.com/documentation/breaking-changes), and many of the advantages of Sass are achievable in modern CSS. 

In addition to this maintenance issue, we found that removing Sass from Shopify themes results in a significant speed improvement when merchants are interacting with the Shopify theme editor. Depending on the size of a stylesheet, switching to a purely CSS approach could reduce page loading times by multiple seconds. The average compile time of Liquid Sass stylesheets in the editor is around 2,000 ms, while it’s only about 300 ms for Liquid CSS stylesheets. 

![alt text](https://cdn.shopify.com/s/files/1/0533/2089/files/deprecating-sass-giff-1_5e4cb4bc-faf8-46bb-a00f-3949c2b4a188.gif?v=1604323679)
<p style="text-align: center; font-size:0.8em;">Changes to theme settings using a version of Debut with Sass.</p>

![alt text](https://cdn.shopify.com/s/files/1/0533/2089/files/deprecating-sass-giff-2.gif?v=1604323763)
<p style="text-align: center; font-size:0.8em;">Changes to theme settings using a version of Debut with CSS—edits take approximately one second less to load.</p>

The use of Sass also impacts how quickly changes are populated to a storefront after updating theme settings via the editor or using the API. 

In both these areas, Sass slows down both the storefront and the editor, meaning it negatively impacts the user experience for both merchants and customers. By migrating to a purely CSS approach within themes, you can ensure your clients don't run into issues when using the theme editor, and updates to the storefront appear without delays.

For the moment, themes containing **.scss** files will continue to function and storefronts will not be affected if a theme uses Sass. However, we are strongly encouraging developers to migrate their Sass stylesheets to CSS stylesheets, or compiling their **.scss** files outside of Shopify. We'll explore some options for achieving this later in this article. 

Currently, we are updating all free and paid Shopify themes to use **.css** files for styling. You can see an example of how this would look like if you view the latest version of Debut, (Version 17.4) which has been fully migrated to using CSS. At the time of writing, 76 percent of paid themes on the Shopify theme store are no longer using Sass.

By working with newer CSS features developers can now make use of custom properties to achieve the same effect as Sass variables, which we'll explore in this post. Developers who may have utilized Sass for working with color styling could implement solutions using [Liquid color filters](https://shopify.dev/docs/themes/liquid/reference/filters/color-filters?itcat=partner_blog&itterm=deprecating_sass&shpxid=f85971a4-629C-4E82-FDB5-782620184653) to change or extract properties from CSS color strings. 

<br />

>**You might also like**: [How We Improved Theme Development Tooling Using Checksums.](https://www.shopify.com/partners/blog/checksums)

<br />

# How to adjust your workflow 

This deprecation does not mean that developers must stop using Sass altogether. Sass and **.scss** files can still be used for styling your theme outside of the platform in a local environment context. The files should be compiled locally before being sent out to a Shopify store, which should only receive the resulting **.css** or **.css.liquid** files.

To achieve this, you could use automation tools in your workflow to compile **.scss** files and generate **.css** files. For example, you could use Gulp, or Webpack, to create a task that will convert a **.scss** file into a **.css** file before you deploy your theme files to a Shopify store. 

Going even further, you could set Gulp to watch multiple **.scss** files, so that any time a change is made to your Sass files, the main **.css** file will be updated with this change. Using these automation tools to compile your **.scss** files will allow you to access the benefits of Sass, without slowing down the speed of your clients’ stores. The Gulp for Beginners guide from CSS Tricks demonstrates a number of approaches for automating file compilation that could be helpful for theme developers looking to improve their workflow. 

Alternatively, theme developers could simply use CSS as their main method for adding and applying styles to themes. This would involve removing Sass variables and helpers from your stylesheet, and converting it from a **.scss** file to a **.css** file. For an example of what this could look like, you can view the **theme.css** file in the current version of [Debut](https://themes.shopify.com/themes/debut/styles/default?itcat=partner_blog&itterm=deprecating_sass). 

# Benefits of native CSS features

There are a number of benefits to adopting new CSS features, now that support for IE11 is no longer a requirement for themes. 

One significant addition is the support for CSS custom properties, or CSS variables, which are properties defined by the developer that contain values that can be reused throughout a stylesheet. CSS variables operate in a similar way to Sass variables, with some minor syntax differences, and will allow theme developers to create cleaner CSS while being less reliant on JavaScript to ensure functionality. 

CSS variables also have access to global Liquid setting objects. To see a basic example of this, we can take a look at how Debut organizes and applies styles passed through defined CSS variables. 

In Debut, all of the CSS variables are defined in the **<head\>** of **theme.liquid**. For example, the color of a primary button is defined as:

```
:root {
--color-btn-primary: {{ settings.color_button }}
```

The **--** here indicates that we're creating a CSS variable. In this case, **--color-btn-primary** can be used to represent the **settings.color_button** object, which is a setting option on the theme editor. Now, when the **--color-btn-primary** variable is used as a value on the stylesheet, we'll see that element taking the color that's selected by the merchant on the theme editor. 

```
.btn, .shopify-payment-button {
color: var(--color-btn-primary-text)}
```

You can learn more about how CSS variables can be used on the [Mozilla developer docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). 

Adopting CSS variables may also allow you to remove unnecessary dependencies from your workflow, such as Slate's [CSSVar Loader](https://shopify.github.io/slate/docs/slate-cssvar-loader?itcat=partner_blog&itterm=deprecating_sass&shpxid=f85971a4-629C-4E82-FDB5-782620184653) plugin that locates custom properties in your stylesheets and replaces them with their corresponding Liquid variables. By making use of native CSS features, you can optimize both your theme and your development workflow.

You may also be working with themes that leverage custom CSS grid classes, and this move away from Sass could be an opportunity to implement CSS Grid. Additionally, using CSS grid will allow you to ship less code and simplify the design experience when you are creating page layouts.

<br />

>**You might also like**: [A CSS Grid Framework for Shopify Collection Pages.](https://www.shopify.com/partners/blog/css-grid-framework)

<br />

# An improved experience for themes

Transitioning to a CSS model on your custom themes will result in a more reliable experience for your clients, as well as remove the limitations of working with an old version of Sass. By deprecating Sass, themes will become leaner and more performant.