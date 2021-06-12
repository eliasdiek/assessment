import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

export default function Home({ allPostsData }) {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p className={utilStyles.textCenter}>Full stack developer</p>
			</section>
			<section>
				<h2>Profile</h2>
				<p>
					Technically sophisticated, competent, and innovative IT
					professional, with experience in web & hybrid mobile
					programming, business analysis, IT management, business
					intelligence, and integration of enterprise applications. I
					am also a full-stack software engineer currently conducting
					React/Node.js and Vue.js development in day-to-day work
					while having multiple years of experience as freelancer
					offering services of crafting online stores on platforms as
					Shopify/Shopify Plus and BigCommerce. My goal has been
					building elegant, professional-looking, and
					performant-focused solutions that support my enterprise and
					small business clients in continuing growth.
				</p>
			</section>
			<section>
				<h2>Employment History</h2>

				<div>
					<h4 className={utilStyles.employeeHeader}>
						React.js frontend developer at Epic Design Labs, Potland
					</h4>
					<div className={utilStyles.employeeMeta}>
						February 2020 — January 2021
					</div>
					<ul className={utilStyles.employeeWorks}>
						<li>
							Building user-friendly web frontend using React.js
							and Next.js
						</li>
						<li>
							Implementing UX/UI to the responsive React.js
							frontend
						</li>
						<li>
							Implementing UX/UI to the responsive React Native
							frontend
						</li>
						<li>Bug fixing and Unit test</li>
					</ul>
				</div>

				<div>
					<h4 className={utilStyles.employeeHeader}>
						Vue.js frontend developer at Quarry team, Remote |
						Globally distributed
					</h4>
					<div className={utilStyles.employeeMeta}>
						April 2018 — January 2020
					</div>
					<ul className={utilStyles.employeeWorks}>
						<li>
							Built the company website using Vue.js and Gridsome
						</li>
						<li>
							Design NoSQL databases such as DynamoDB, MongoDB
						</li>
						<li>
							Implementing UX/UI to the responsive Vue.js frontend
						</li>
						<li>Bug fixing and Unit test</li>
					</ul>
				</div>

				<div>
					<h4 className={utilStyles.employeeHeader}>
						Lead Shopify/Shopify Plus developer at Command C, New
						York
					</h4>
					<div className={utilStyles.employeeMeta}>
						July 2020 — December 2020
					</div>
					<ul className={utilStyles.employeeWorks}>
						<li>Maintaining Shopify/Shopify Plus stores</li>
						<li>Developing custom Shopify app</li>
						<li>Developing several custom sections</li>
						<li>Troubleshooting & Bug fixing</li>
					</ul>
				</div>

				<div>
					<h4 className={utilStyles.employeeHeader}>
						Shopify Partner at Self-employed
					</h4>
					<div className={utilStyles.employeeMeta}>
						May 2016 — Present
					</div>
					<p>
						I have been helping store owners to build elegant &
						user-friendly e-commerce stores by developing Shopify
						themes and apps. Also, I do Shopify theme customization.
					</p>
				</div>
			</section>

      <section>
        <h2>Links</h2>
        <ul>
          <li>
            <a href="https://www.linkedin.com/in/david-zhang-176167207" target="_blank">Linkedin</a>
          </li>
          <li>
            <a href="https://github.com/lambdadev007" target="_blank">Github</a>
          </li>
          <li>
            <a href="https://calendly.com/yuyuan-zhang" target="_blank">Calendar</a>
          </li>
        </ul>
      </section>

			<section
				className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
			>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{allPostsData.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							<Link href="/posts/[id]" as={`/posts/${id}`}>
								<a>{title}</a>
							</Link>
							<br />
							<small className={utilStyles.lightText}>
								<Date dateString={date} />
							</small>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
}

export async function getStaticProps() {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData,
		},
	};
}
