import React from "react"
import clsx from "clsx"
import styles from "./HomepageFeatures.module.css"

const FeatureList = [
	{
		title: "Fast To Get Started With",
		Svg: require("../../static/img/svg_fast.svg").default,
		description: (
			<>
				Lithium allows you to get started with your CLI fast. Like 10
				minutes and you're done fast.
			</>
		),
	},
	{
		title: "It's Just JavaScript + AutoComplete",
		Svg: require("../../static/img/svg_js.svg").default,
		description: (
			<>
				It's not some flavour of JS that needs you to add bundlers and
				what not...nope, just use plain, lovely JS and be done with it.
			</>
		),
	},
]

function Feature({ Svg, title, description }) {
	return (
		<div className={clsx("col col--6")}>
			<div className="text--center">
				<Svg className={styles.featureSvg} alt={title} />
			</div>
			<div className="text--center padding-horiz--md">
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	)
}

export default function HomepageFeatures() {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	)
}
