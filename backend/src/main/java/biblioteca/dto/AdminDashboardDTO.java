package biblioteca.dto;

import java.util.List;

public class AdminDashboardDTO {

    private long totalBooks;
    private long borrowedBooks;
    private long availableBooks;
    private long totalUsers;
    private long admins;
    private long readers;
    private long lateLoans;

    private List<CategoryCountDTO> booksByCategory;
    private List<UpcomingReturnDTO> upcomingReturns;

    public AdminDashboardDTO(
            long totalBooks,
            long borrowedBooks,
            long availableBooks,
            long totalUsers,
            long admins,
            long readers,
            long lateLoans,
            List<CategoryCountDTO> booksByCategory,
            List<UpcomingReturnDTO> upcomingReturns) {
        this.totalBooks = totalBooks;
        this.borrowedBooks = borrowedBooks;
        this.availableBooks = availableBooks;
        this.totalUsers = totalUsers;
        this.admins = admins;
        this.readers = readers;
        this.lateLoans = lateLoans;
        this.booksByCategory = booksByCategory;
        this.upcomingReturns = upcomingReturns;
    }

    public long getTotalBooks() {
        return totalBooks;
    }

    public long getBorrowedBooks() {
        return borrowedBooks;
    }

    public long getAvailableBooks() {
        return availableBooks;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public long getAdmins() {
        return admins;
    }

    public long getReaders() {
        return readers;
    }

    public long getLateLoans() {
        return lateLoans;
    }

    public List<CategoryCountDTO> getBooksByCategory() {
        return booksByCategory;
    }

    public List<UpcomingReturnDTO> getUpcomingReturns() {
        return upcomingReturns;
    }
}