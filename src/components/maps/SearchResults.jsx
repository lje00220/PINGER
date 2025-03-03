const SearchResults = ({ filteredJobs, setSelectedCompany }) => (
  <ul className="bg-white shadow-md rounded-lg max-h-[70vh] overflow-auto">
    {filteredJobs.map((job) => (
      <li
        key={job.id}
        className="p-2 border-b cursor-pointer hover:bg-my-main"
        onClick={() => setSelectedCompany(job)}
      >
        <strong>{job.company_name}</strong>
      </li>
    ))}
  </ul>
);

export default SearchResults;