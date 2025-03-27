import Button from "../../../../components/ui/Button";


export default function AdminNewsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Управління новинами</h1>
        <Button variant="primary">Додати новину</Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <p className="text-gray-500">Ще немає новин для відображення.</p>
        </div>
      </div>
    </div>
  );
}