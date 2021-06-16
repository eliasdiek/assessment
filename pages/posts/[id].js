import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { DiscussionEmbed } from 'disqus-react';
import { useRouter } from 'next/router';

export default function Post({ postData }) {
    const router = useRouter();

    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={`${utilStyles.headingXl} ${utilStyles.textCenter}`}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                <Date className={utilStyles.textCenter} dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
            
            <DiscussionEmbed
                shortname="devlandunion"
                config={
                    {
                        url: `https://devlandunion.com/${router.pathname}`,
                        identifier: postData.id,
                        title: postData.title,
                        language: 'en_US'
                    }
                }
            />
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds()

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}