const SearchResults = ({ filteredJobs, setSelectedCompany }) => (
  <ul className="max-h-[70vh] overflow-auto rounded-lg bg-white shadow-md">
    {filteredJobs.map((job) => (
      <li
        key={job.id}
        className="cursor-pointer border-b p-2 hover:bg-my-main"
        onClick={() => setSelectedCompany(job)}
      >
        <strong>{job.company_name}</strong>
      </li>
    ))}
  </ul>
);

export default SearchResults;
