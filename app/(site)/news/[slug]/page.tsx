export default function NewsDetailPage({ params }: { params: { slug: string } }) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Детальна сторінка новини</h1>
        <p className="mb-4">
          Детальна інформація про новину з slug: {params.slug}
        </p>
      </div>
    );
  }