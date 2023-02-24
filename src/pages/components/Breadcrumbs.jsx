import Link from 'next/link';

const Breadcrumbs = ({ crumbs }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {crumbs.map(({ name, path }) => (
          <li key={path} className="breadcrumb-item">
            {path ? <Link href={path}>{name}</Link> : name}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
