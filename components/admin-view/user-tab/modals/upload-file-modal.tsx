import { useNetwork, useSnack, useSupabase } from '@/hooks';
import { UserType } from '@/types';
import { ChangeEvent, useState } from 'react';

interface Props {
  handleResetState: Function;
}

const phoneRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const sampleRows = [
  ['Zea Maleham', 'NJ', '688-534-3458', 'true'],
  ['Annmaria Greensmith', 'MA', '490-911-6630', 'false'],
  ['Roddy Vearncomb', 'NY', '536-419-8641', 'true'],
  ['Kara Sivewright', 'SOUTH', '779-227-7505', 'false'],
  ['Emalee Barrowcliff', 'NJ', '528-468-7066', 'true'],
];

const csvContent =
  'data:text/csv;charset=utf-8,' +
  sampleRows.map((e) => e.join(',')).join('\n');

const UploadFileModal = ({ handleResetState }: Props) => {
  const supabase = useSupabase();
  const [membersFromFile, setMembersFromFile] = useState<UserType[]>([]);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);
  const { addSnack } = useSnack();
  const { selector: network } = useNetwork();
  const disabled = creating || !network.isOnline;

  const handleDownloadSample = () => {
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'user members sample.csv');
    document.body.appendChild(link);
    link.click();
  };

  const handleUploadClick = () => {
    document.getElementById('uploadFileSelect')?.click();
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const convertRowToUser = (row: string) => {
      const fieldData = row.split(',');
      if (fieldData.length !== 4) return;
      if (fieldData.some((data) => !data)) return;

      const name = fieldData[0].trim();
      const branch = fieldData[1].trim();
      const phone = fieldData[2].trim();
      const active = fieldData[3].trim();

      if (!['nj', 'ny', 'ma', 'south'].includes(branch.toLowerCase())) return;
      if (!phoneRegex.test(phone)) return;

      let data: UserType = {
        name: name,
        branch: branch.toUpperCase(),
        phone: phone,
        active: ['true', 'TRUE'].includes(active),
      };

      return data;
    };

    if (event.target.files && event.target.files.length > 0) {
      const input = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        const rows = e?.target?.result?.toString().split('\n');
        const members: UserType[] = [];

        rows?.forEach((row) => {
          let member = convertRowToUser(row);
          if (member) members.push(member);
        });

        setMembersFromFile(members);
      };
      reader.readAsText(input);
    }
  };

  const handleCreate = async () => {
    setCreating(true);

    const { error } = await supabase.user.createUsers(membersFromFile);

    if (error) {
      setError(error.message);
      setCreating(false);
    } else {
      handleResetState();
      addSnack('success', 'Users successfully created!');
    }
  };

  return (
    <dialog className="modal modal-open text-black">
      <div className="modal-box bg-white flex flex-col gap-2">
        <h3 className="font-bold text-lg">Upload CSV Spreadsheet of Members</h3>
        <div className="text-black">
          Download a{' '}
          <span
            onClick={handleDownloadSample}
            className="font-bold text-blue-500 cursor-pointer"
          >
            sample CSV template
          </span>{' '}
          to see an example of the format required.
        </div>
        <input
          id="uploadFileSelect"
          hidden
          type="file"
          onChange={(event) => handleFileSelect(event)}
          accept=".csv"
        />
        <div className="flex flex-col text-black gap-2">
          <div className="font-bold">File Help</div>
          <ol className="list-decimal list-inside text-xs lg:text-sm">
            <li>
              {`Your file must consist of 4 columns: name, branch, phone and financially active.`}
            </li>
            <li>The columns must be in the order specified above.</li>
            <li>{`Do not add a header row.`}</li>
            <li>{`Only CSV files are allowed!`}</li>
          </ol>
        </div>
        {membersFromFile.length !== 0 && (
          <div className="font-bold">{`Ready to create ${membersFromFile.length} members!`}</div>
        )}
        {error && <p className="text-red-500 font-bold text-center">{error}</p>}
        <div className="modal-action">
          <button
            className="btn btn-sm btn-outline"
            onClick={() => handleResetState()}
          >
            cancel
          </button>
          {membersFromFile.length !== 0 ? (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => handleCreate()}
              disabled={disabled}
            >
              create members
            </button>
          ) : (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => handleUploadClick()}
            >
              upload file
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default UploadFileModal;
