import Link from 'next/link';

const Breadcrumbs = ({ crumbs }) => {


  if (!crumbs || crumbs.length === 0) {
    // Return null if crumbs is undefined or empty
    return null;
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {crumbs.map(({ name, path }) => {
          return (
            <li key={path} className="breadcrumb-item">
              {path ? <Link href={path}>{name}</Link> : name}
            </li>
          )
        } )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
