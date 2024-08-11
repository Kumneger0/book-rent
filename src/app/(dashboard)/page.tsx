import BookList from '@/components/bookList';
import { prisma } from '@/db';

async function Page() {
	const books = await prisma.book.findMany({
		where: {
			isApproved: true
		}
	});

	return <BookList books={books} />;
}

export default Page;
