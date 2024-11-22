import React, { useState, useEffect } from 'react';
import './ABB.css';
import Header from "../MainResource/Header";
import { fetchPosts } from '../api';
import { Link } from 'react-router-dom';

const NoticeRow = ({ number, title, author, date, views }) => {
    return (
        <tr className="ABB-notice-row">
            <td>{number}</td>
            <td><Link to={`/posts/${number}`}>{title}</Link></td>
            <td>{author}</td>
            <td>{date}</td>
            <td>{views}</td>
        </tr>
    );
};

const PostList = ({ currentPage, itemsPerPage }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                // currentPage와 itemsPerPage를 전달
                const data = await fetchPosts(currentPage, itemsPerPage);
                setPosts(data.posts || []);
            } catch (err) {
                console.error('Error fetching posts:', err);
            }
        };
        loadPosts();
    }, [currentPage, itemsPerPage]);

    return (
        <table className="ABB-post-table">
            <thead>
            <tr className="ABB-post-header">
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>날짜</th>
                <th>조회수</th>
            </tr>
            </thead>
            <tbody>
            {posts.length === 0 ? (
                <tr className="ABB-no-posts">
                    <td colSpan="5">게시물이 없습니다.</td>
                </tr>
            ) : (
                posts.map((post) => (
                    <NoticeRow
                        key={post.post_id}
                        number={post.post_id}
                        title={post.title}
                        author={post.author}
                        date={post.created_at}
                        views={post.views}
                    />
                ))
            )}
            </tbody>
        </table>
    );
};

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="ABB-pagination">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#"
               onClick={(e) => {
                   e.preventDefault();
                   if (currentPage > 1) setCurrentPage(currentPage - 1);
               }}
            >
                &laquo; 이전
            </a>
            {pageNumbers.map((number) => (
                <a
                    href="#"
                    key={number}
                    className={number === currentPage ? 'ABB-active' : ''}
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(number);
                    }}
                >
                    {number}
                </a>
            ))}
            <a href="#"
               onClick={(e) => {
                   e.preventDefault();
                   if (currentPage < totalPages) setCurrentPage(currentPage + 1);
               }}
            >
                다음 &raquo;
            </a>
        </div>
    );
};

const AllBulletinBoards = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const loadTotalPages = async () => {
            try {
                const data = await fetchPosts(currentPage, itemsPerPage);
                setTotalPages(data.total_pages || 1);
            } catch (err) {
                console.error('Error fetching total pages:', err);
            }
        };
        loadTotalPages();
    }, [currentPage, itemsPerPage]);

    return (
        <div>
            <div className="background-text">
                <article>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus
                        tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
                        Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec
                        nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis
                        arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus
                        volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede.
                        Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante
                        ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac
                        mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
                        Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing.
                        Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium
                        libero.Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit
                        amet, nonummy id, imperdiet feugiat, pede.Sed lectus. Donec mollis hendrerit risus. Phasellus
                        nec sem in justo pellentesque facilisis.
                        Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor,
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus
                        tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
                        Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec
                        nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis
                        arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus
                        volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede.
                        Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante
                        ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac
                        mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
                        Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing.
                        Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium
                        libero.Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit
                        amet, nonummy id, imperdiet feugiat, pede.Sed lectus. Donec mollis hendrerit risus. Phasellus
                        nec sem in justo pellentesque facilisis.
                        Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et,
                        hendrerit quis, nisi.Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci
                        vel massa suscipit
                        pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper
                        nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis.
                        Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum
                        dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula.
                        Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris
                        ullamcorper felis vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis
                        lectus, et tristique ligula justo vitae magna.Aliquam convallis sollicitudin purus. Praesent
                        aliquam, enim at fermentum mollis, ligula massa
                        adipiscing nisl, ac euismod nibh nisl eu lectus. Fusce vulputate sem at sapien. Vivamus leo.
                        Aliquam euismod libero eu enim. Nulla nec felis sed leo placerat imperdiet. Aenean suscipit
                        nulla in justo. Suspendisse cursus rutrum augue. Nulla tincidunt tincidunt mi. Curabitur
                        iaculis, lorem vel rhoncus faucibus, felis magna fermentum augue, et ultricies lacus lorem
                        varius purus. Curabitur eu amet.
                        Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo
                        quis
                        pede.Donec interdum, metus et hendrerit aliquet, dolor diam sagittis ligula, eget egestas libero
                        turpis vel mi. Fusce fermentum. Nullam cursus lacinia erat.Praesent blandit laoreet nibh. Fusce
                        convallis metus id felis luctus adipiscing. Pellentesque
                        egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non
                        est. Ut leo. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper
                        suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.Integer ante arcu,
                        accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing.
                        Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero.
                        Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet,
                        nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem
                        in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo
                        dolor, tempus non, auctor et, hendrerit quis, nisi.Curabitur ligula sapien, tincidunt non,
                        euismod vitae, posuere imperdiet, leo. Maecenas
                        malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere
                        vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci
                        luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat
                        euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Aenean
                        tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum fringilla pede sit amet
                        augue. In turpis. Pellentesque posuere. Praesent turpis.Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Sed non risus. Suspendisse lectus
                        tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
                        Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec
                        nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis
                        arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus
                        volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede.
                        Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante
                        ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac
                        mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
                        Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing.
                        Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium
                        libero.Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit
                        amet, nonummy id, imperdiet feugiat, pede.Sed lectus. Donec mollis hendrerit risus. Phasellus
                        nec sem in justo pellentesque facilisis.
                        Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor,
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus
                        tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
                        Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec
                        nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis
                        arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus
                        volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede.
                        Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante
                        ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac
                        mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
                        Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing.
                        Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium
                        libero.Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit
                        amet, nonummy id, imperdiet feugiat, pede.Sed lectus. Donec mollis hendrerit risus. Phasellus
                        nec sem in justo pellentesque facilisis.
                        Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et,
                        hendrerit quis, nisi.Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci
                        vel massa suscipit
                        pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper
                        nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis.
                        Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum
                        dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula.
                        Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris
                        ullamcorper felis vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis
                        lectus, et tristique ligula justo vitae magna.Aliquam convallis sollicitudin purus. Praesent
                        aliquam, enim at fermentum mollis, ligula massa
                        adipiscing nisl, ac euismod nibh nisl eu lectus. Fusce vulputate sem at sapien. Vivamus leo.
                        Aliquam euismod libero eu enim. Nulla nec felis sed leo placerat imperdiet. Aenean suscipit
                        nulla in justo. Suspendisse cursus rutrum augue. Nulla tincidunt tincidunt mi. Curabitur
                        iaculis, lorem vel rhoncus faucibus, felis magna fermentum augue, et ultricies lacus lorem
                        varius purus. Curabitur eu amet.
                        Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo
                        quis
                        pede.Donec interdum, metus et hendrerit aliquet, dolor diam sagittis ligula, eget egestas libero
                        turpis vel mi. Fusce fermentum. Nullam cursus lacinia erat.Praesent blandit laoreet nibh. Fusce
                        convallis metus id felis luctus adipiscing. Pellentesque
                        egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non
                        est. Ut leo. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper
                        suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.Integer ante arcu,
                        accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing.
                        Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero.
                        Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet,
                        nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem
                        in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo
                        dolor, tempus non, auctor et, hendrerit quis, nisi.Curabitur ligula sapien, tincidunt non,
                        euismod vitae, posuere imperdiet, leo. Maecenas
                        malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere
                        vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci
                        luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat
                        euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Aenean
                        tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum fringilla pede sit amet
                        augue. In turpis. Pellentesque posuere. Praesent turpis., posuere a, pede. Donec nec justo eget
                        felis facilisis fermentum.Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.
                        Praesent adipiscing.
                        Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero.
                        Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet,
                        nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem
                        in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo
                        dolor, tempus non, auctor et, hendrerit quis, nisi.Curabitur ligula sapien, tincidunt non,
                        euismod vitae, posuere imperdiet, leo. Maecenas
                        malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere
                        vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci
                        luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat
                        euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Aenean
                        tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum fringilla pede sit amet
                        augue. In turpis. Pellentesque posuere. Praesent turpis. ante arcu, accumsan a, consectetuer
                        eget, posuere ut, mauris. Praesent adipiscing.
                        Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium
                        libero.Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit
                        amet, nonummy id, imperdiet feugiat, pede.Sed lectus. Donec mollis hendrerit risus. Phasellus
                        nec sem in justo pellentesque facilisis.
                        Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor,
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus
                        tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
                        Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec
                        nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis
                        arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus
                        volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede.
                        Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante
                        ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac
                        mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
                        Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing.
                        Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium
                        libero.Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit
                        amet, nonummy id, imperdiet feugiat, pede.Sed lectus. Donec mollis hendrerit risus. Phasellus
                        nec sem in justo pellentesque facilisis.
                        Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et,
                        hendrerit quis, nisi.Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci
                        vel massa suscipit
                        pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper
                        nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis.
                        Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum
                        dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula.
                        Nulla et sapien. Integer tortor tellus, aliquam fMorbisapien eros vitae ligula. Pellentesque
                        rhoncus nunc et augue. Integer id felis.
                        Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum
                        dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula.
                        Nulla et sapien. Integer tortor tellus, aliquam fMorbi
                    </p>
                </article>
            </div>
            <Header/>
            <div className="ABB-container">
                <h2 className="ABB-title">전체게시판</h2>
                <PostList
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                />
                <Link to="/write" className="ABB-write-btn">글쓰기</Link>
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default AllBulletinBoards;
