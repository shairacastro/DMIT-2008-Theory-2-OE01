import BasicLayout from "./BasicLayout";

export default function Layout({ title, description, page, seoProfile, children }) {
  return (
    <BasicLayout
      title={title}
      description={description}
      page={page}
      seoProfile={seoProfile}
    >
      {children}
    </BasicLayout>
  );
}
