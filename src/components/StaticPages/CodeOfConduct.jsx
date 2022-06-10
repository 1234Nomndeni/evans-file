import React from "react";
import { Helmet } from "react-helmet";

const CodeOfConduct = () => {
  return (
    <main
      onLoad={window.scroll(0, 0)}
      className="mt-20 md:mt-24 mx-wd1 bg-white mx-auto p-2 md:p-4 text-gray-900 md:pt-12 md:pl-12 border rounded-md"
    >
      <Helmet>
        <title>Melbite | Code Of Conduct</title>
      </Helmet>
      <section>
        <h1 className="text-2xl md:text-4xl text-gray-800 mb-5 leading-5">
          Code Of Conduct
        </h1>
        <p className="text-gray-600">Effective from March 17, 2022</p>

        <div className="text-md mt-5 mx-wd2">
          <p className="mb-4 text-gray-900">
            All member and participants of Melbite are expected to abide by our
            Code of Conduct.
          </p>
          <h2 className="mb-1 text-gray-900 text-2xl ">Our Pledge</h2>
          <p className="mb-4 text-gray-900">
            In the interest of fostering an open and welcoming environment, we
            as users, contributors and maintainers pledge to make participation
            in our project and our community a harassment-free experience for
            everyone, regardless of age, body size, disability, ethnicity,
            gender identity and expression, level of experience, nationality,
            personal appearance, race, religion, or sexual identity and
            orientation.
          </p>
          <h2 className="mb-1 text-gray-900 text-2xl ">Our Standards</h2>
          <p className="mb-4 text-gray-900">
            Examples of behavior that contributes to creating a positive
            environment include:{" "}
          </p>
          <div className="ml-5 mb-4 text-gray-900">
            <li>Using welcoming and inclusive language</li>
            <li>Being respectful of differing viewpoints and experiences</li>
            <li>
              Referring to people by their preferred pronouns and using
              gender-neutral pronouns when uncertain
            </li>
            <li>Gracefully accepting constructive criticism</li>
            <li>Focusing on what is best for the community</li>
            <li>Showing empathy towards other community members</li>
          </div>
          <p className="mb-4 text-gray-900">
            We pledge to prioritize marginalized people’s safety over privileged
            people’s comfort. We will not act on complaints regarding:
          </p>
          <div className="ml-5 mb-4 text-gray-900">
            <li>
              ‘Reverse’ -isms, including ‘reverse racism,’ ‘reverse sexism,’ and
              ‘cisphobia’
            </li>
            <li>
              Reasonable communication of boundaries, such as 'leave me alone,'
              'go away,' or 'I’m not discussing this with you.'
            </li>
            <li>
              Someone’s refusal to explain or debate social justice concepts
            </li>
            <li>
              Criticisms of racist, sexist, cissexist, or otherwise oppressive
              behavior or assumptions
            </li>
          </div>
          <h2 className="mb-1 text-gray-900 text-2xl ">Enforcement</h2>
          <p className="mb-4 text-gray-900">
            Violations of the Code of Conduct may be reported by contacting the
            team via email to{" "}
            <a className="text-purple-900" href="mailto: info@melbite.com">
              info@melbite.com
            </a>
            . All reports will be reviewed and investigated and will result in a
            response that is deemed necessary and appropriate to the
            circumstances. Further details of specific enforcement policies may
            be posted separately.{" "}
          </p>
          <p className="mb-4 text-gray-900">
            Moderators have the right and responsibility to remove comments or
            other contributions that are not aligned to this Code of Conduct, or
            to suspend temporarily or permanently any members for other
            behaviors that they deem inappropriate, threatening, offensive, or
            harmful.
          </p>
          <h2 className="mb-1 text-gray-900 text-2xl ">Attribution</h2>
          <p>
            This Code of Conduct is adapted from the{" "}
            <a
              className="text-purple-800"
              href="https://www.contributor-covenant.org/version/1/4/code-of-conduct/"
            >
              Contributor Covenant, version 1.4
            </a>{" "}
          </p>
        </div>
      </section>
    </main>
  );
};

export default CodeOfConduct;
