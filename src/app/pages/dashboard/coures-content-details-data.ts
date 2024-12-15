import { DomSanitizer } from '@angular/platform-browser';

export const courseContentList: any[] = [
    {
      "id": 1,
      "value": "TECHNOLOGY",
      "bold": true,
      "type": "title"
    },
    {
      "id": 2,
      "value": "WELCOME",
      "bold": true,
      "type": "title"
    },
    {
      "id": 3,
      "value": "Chương trình sẽ giới thiệu bạn học về phân tích dữ liệu và trang bị cho các bạn một số kỹ năng được yêu cầu nhiều nhất trong nền kinh tế hiện đại.",
      "bold": false,
      "type": "description"
    },
    {
      "id": 4,
      "value": "Chương trình giáo dục này được thiết kế để chuẩn bị cho người học trưởng thành đang làm việc với các kỹ năng cần thiết để chuyển sang lĩnh vực phân tích dữ liệu, bao gồm các khái niệm phân tích dữ liệu cơ bản như với các bảng tính, SQL và trang bị các kỹ năng thiết yếu trong giao tiếp kinh doanh.",
      "bold": false,
      "type": "description"
    },
    {
      "id": 6,
      "value": "Các hình thức đánh giá: Gồm 4 hình thức chính",
      "bold": true,
      "type": "description"
    },
    {
      "id": 7,
      "value": "Đánh giá trước khóa học (Pre-Assessments):Bạn sẽ làm một bài kiểm tra nhỏ trước khi bắt đầu học để xem xét lượng kiến thức của bạn về chủ đề sắp tới. Nếu bạn làm đúng, bạn sẽ được mở khóa các bài học tiếp theo.",
      "bold": false,
      "type": "child"
    },
    {
      "id": 8,
      "value": "Bài kiểm tra định hình (Formative Assessments): Bạn sẽ làm bài tập để củng cố kiến thức để đánh giá xem bạn đã hiểu bài đến đâu trong quá trình học và bạn cần đạt ít nhất 80% điểm mới được coi là đã hoàn thành bài.",
      "bold": false,
      "type": "child"
    },
    {
      "id": 9,
      "value": "Bài thảo luận và bài tập (Discussion Boards and Milestone Activities): Bạn sẽ có các cuộc thảo luận và cần hoàn thành các bài tập nhỏ để tương tác với các bạn cùng lớp và áp dụng kiến thức vào thực tế.",
      "bold": false,
      "type": "child"
    },
    {
      "id": 10,
      "value": "Bài kiểm tra tổng kết (Summative Assessments): Bạn sẽ làm một bài kiểm tra tổng kết cho mỗi chủ đề để đánh giá xem bạn đã nắm vững toàn bộ kiến thức của một chủ đề hay chưa và bạn cần đạt ít nhất 80% điểm mới được chuyển sang học chủ đề tiếp theo. ",
      "bold": false,
      "type": "child"
    },
    {
      "id": 11,
      "value": "MEET YOUR INSTRUCTORS. ",
      "bold": true,
      "type": "title"
    },
    {
      "id": 12,
      "value": "Xin chào mọi người, chúng tôi rất mong được hợp tác và khởi đầu khóa học một cách thuận lợi. Khóa học sẽ diễn ra dưới hình thức trực tuyến - tất cả các chi tiết của khóa học có thể được tìm thấy trong khóa học trực tuyến, bao gồm giáo trình, tệp tổng quan về năng lực, bài giảng video, bài đọc, ..đều có trong hệ thống khóa học.Trước khi bắt đầu khóa học, chúng ta có một số điểm cần lưu ý sau:",
      "bold": false,
      "type": "descripton"
    },
    {
      "id": 13,
      "value": "Bắt đầu làm quen với Hệ thống quản lý quá trình học.",
      "bold": false,
      "type": "child"
    },
    {
      "id": 14,
      "value": "Đọc và tìm hiểu kế hoạch học tập, bài giới thiệu , và phần tổng quan ở Chương 1 để hiểu rõ nắm rõ mục đích trong quá trình học tập.",
      "bold": false,
      "type": "child"
    },
    {
      "id": 15,
      "value": "Nếu có bất kỳ thắc mắc nào, người học có thể đăng tải câu hỏi vào diễn đàn để cùng nhau thảo luận.",
      "bold": false,
      "type": "child"
    },
    {
      "id": 16,
      "value": "LỘ TRÌNH KHÓA HỌC",
      "bold": true,
      "type": "title"
    },
    {
      "id": 17,
      "value": "Khóa học  Phân Tích Dữ Liệu bao gồm 2 phần lớn được chia làm nhiều phần nhỏ dựa trên các kỹ năng khác nhau: ",
      "bold": false,
      "type": "description"
    },
    {
      "id": 18,
      "value": "Khởi đầu với việc giới thiệu các kỹ năng kỹ thuật và kiến thức cần thiết để tham gia vào lĩnh vực phân tích dữ liệu. Bạn sẽ hiểu về internet, web, và các ứng dụng di động, cũng như cách dữ liệu được tạo ra; phân biệt giữa các ngôn ngữ lập trình phổ biến; và cách ta nhập, định dạng, làm sạch và trực quan hóa dữ liệu cơ bản.",
      "bold": false,
      "type": "child"
    },
    {
      "id": 19,
      "value": "Tiếp đó, nắm được các kỹ năng kỹ thuật cần thiết để thực hiện truy vấn cơ sở dữ liệu bằng ngôn ngữ SQL, học về mô hình quan hệ, cách thao tác các bảng cơ sở dữ liệu bằng các phép toán đại số quan hệ, và áp dụng những khái niệm lý thuyết này vào một ngôn ngữ rất phổ biến là SQL.",
      "bold": false,
      "type": "child"
    },
    {
      "id": 20,
      "value": "CƠ HỘI VIỆC LÀM CỦA NGƯỜI LÀM DATA Ở VIỆT NAM.",
      "bold": true,
      "type": "title"
    },
    {
      "id": 21,
      "value": "Các công việc liên quan đến dữ liệu đang phát triển mạnh mẽ tại Việt Nam, với nhu cầu về chuyên gia dữ liệu ngày càng tăng trong bối cảnh số hóa toàn cầu và ứng dụng công nghệ vào mọi lĩnh vực kinh tế. Dữ liệu ngày càng trở thành tài sản quý giá trong việc định hình chiến lược kinh doanh, quản lý doanh nghiệp hiệu quả. Bất kể ngành nghề gì, việc sử dụng dữ liệu đều đòi hỏi sự tham gia của các chuyên gia về data sẽ làm cho dữ liệu thô trở thành những thông tin hữu ích và nhu cầu việc làm về lĩnh vực data cũng ngày càng rộng mở và có sức hấp dẫn lớn tới mọi người.",
      "bold": false,
      "type": "description"
    },
    {
      "id": 22,
      "value": "Khu vực miền Bắc: Hà Nội - trung tâm chính trị, kinh tế của cả nước, tập trung nhiều doanh nghiệp lớn, các tập đoàn công nghệ và tổ chức tài chính.",
      "bold": false,
      "type": "child"
    },
    {
      "id": 23,
      "value": "Khu vực miền Nam: TP. Hồ Chí Minh - trung tâm kinh tế lớn nhất của Việt Nam, với số lượng doanh nghiệp công nghệ và startup nhiều nhất cả nước.",
      "bold": false,
      "type": "child"
    },
    {
      "id": 24,
      "value": "Đã tạo ra nhu cầu lớn về nhân sự Data để hỗ trợ các hoạt động kinh doanh, nghiên cứu và phát triển sản phẩm. Với tốc độ số hóa ngày càng tăng và sự gia tăng nhu cầu về phân tích dữ liệu trong mọi lĩnh vực, thị trường lao động cho các chuyên gia dữ liệu tại Việt Nam, đặc biệt là ở Hà Nội và TP. Hồ Chí Minh, sẽ tiếp tục mở rộng.",
      "bold": false,
      "type": "description"
    },
    {
      "id": 25,
      "value": "BẮT ĐẦU BÀI HỌC",
      "bold": true,
      "type": "title"
    },
    {
      "id": 26,
      "value": "Yêu cầu của khóa học:",
      "bold": false,
      "type": "description"
    },
    {
      "id": 27,
      "value": "Chromebook hoặc Laptop",
      "bold": false,
      "type": "child"
    },
    {
      "id": 28,
      "value": "Kết nối Internet",
      "bold": false,
      "type": "child"
    },
    {
      "id": 29,
      "value": "Tài khoản LinkedIn Learning miễn phí (để truy cập tài liệu khóa học)",
      "bold": false,
      "type": "child"
    },
    {
      "id": 30,
      "value": "Tài khoản Coursera miễn phí ",
      "bold": false,
      "type": "child"
    },
    {
      "id": 31,
      "value": "THIẾT LẬP TÀI KHOẢN LINKEDIN LEARNING ",
      "bold": true,
      "type": "title"
    },
    {
      "id": 32,
      "value": "Để truy cập tài liệu LinkedIn Learning trong chương trình học, bạn cần kích hoạt một tài khoản LinkedIn Learning. Bạn có thể xem trước hướng dẫn và thực hiện theo các bước để kích hoạt LinkedIn Learning của bạn.",
      "bold": false,
      "type": "description"
    },
    {
      "id": 33,
      "value": "THAM GIA KHÓA HỌC GOOGLE DATA ANALYTICS CERTIFICATE TRÊN COURSERA",
      "bold": true,
      "type": "title"
    },
    {
      "id": 33,
      "value": "Sau khi bạn đã nắm được (đạt điểm 80% trở lên) các kỹ năng cần trang bị trong khóa học, bạn sẽ nhận được email từ Coursera mời tham gia chương trình đào tạo cho những nhà quản lý hoặc những người có kỹ năng chuyên môn thông qua hình thức trực tuyến. Khi nhận được email từ Coursera mời bạn tham gia chương trình, bạn học sẽ cần làm theo các hướng dẫn trong tài liệu hướng dẫn để tham gia, đăng ký, và bắt đầu khóa học Google Data Analytics Certificate.",
      "bold": false,
      "type": "description"
    },
    {
      "id": 34,
      "value": "Hướng dẫn đăng ký khóa học: Coursera x Enroll and Login- Learner Guide.pdf",
      "bold": false,
      "type": "description"
    },
    {
      "id": 35,
      "value": "DISCUSSION INTRODUCE YOURSELF",
      "bold": true,
      "type": "title"
    },
    {
      "id": 36,
      "value": "Hãy chia sẻ một chút về bản thân. Sở thích của bạn là gì, cả  không có kiến thức chuyên ngành lẫn có kiến thức về ngành? Tại sao bạn quan tâm đến chương trình này và mục tiêu nghề nghiệp của bạn là gì? Về cơ bản, bạn sẽ đóng góp gì cho khóa học và bạn mong muốn đạt được điều gì từ nó? Bạn có dự định theo đuổi chứng chỉ Google Data Analytics sau khi hoàn thành chương trình này không?",
      "bold": false,
      "type": "description"
    },
    {
      "id": 37,
      "value": "Hãy đăng 1 bài lên bảng thảo luận này và trả lời 2 bài đăng của các bạn cùng lớp.",
      "bold": false,
      "type": "description"
    },
    {
      "id": 38,
      "value": "PRE-ASSESSMENT",
      "bold": true,
      "type": "title"
    },
    {
      "id": 39,
      "value": "Nếu đạt dưới 80% điểm trong bài đánh giá. Bạn sẽ cần tham gia thực hành luyện tập trước khi chuyển sang các hoạt động đủ điều kiện về điểm và bài đánh giá tổng kết bao gồm cả bài học và bài kiểm tra.",
      "bold": false,
      "type": "description"
    },
    {
      "id": 40,
      "value": "DATA ANALYTICS VIDEO",
      "bold": true,
      "type": "title"
    },
    {
      "id": 41,
      "value": "Chương 1: Bắt đầu với Phân tích Dữ liệu",
      "bold": true,
      "type": "description"
    },
    {
      "id": 42,
      "value": "Mục tiêu: Sau khi hoàn thành loạt video này, bạn sẽ hiểu được vai trò của một nhà phân tích dữ liệu, xác định được các loại công việc cho nhà phân tích dữ liệu và xác định được các ngôn ngữ lập trình và kỹ thuật được sử dụng để quản lý dữ liệu.",
      "bold": false,
      "type": "description"
    },
    {
      "id": 43,
      "value": "1. Định nghĩa phân tích dữ liệu và nhà phân tích dữ liệu",
      "bold": true,
      "type": "description"
    },
    {
      "id": 44,
      "value": "Quá trình phân tích dữ liệu là quá trình thực hiện tìm kiếm, thu thập, làm sạch, chuyển đổi, mô hình hóa và trình bày dữ liệu với mục tiêu trích xuất thông tin hữu ích để hỗ trợ việc ra quyết định. Đó là việc biến những con số, những thông tin thô sơ thành những hiểu biết sâu sắc, giúp chúng ta trả lời những câu hỏi như:",
      "bold": false,
      "type": "description"
    },
    {
      "id": 45,
      "value": "Điều gì đã xảy ra? (Phân tích mô tả)",
      "bold": false,
      "type": "child"
    },
    {
      "id": 46,
      "value": "Tại sao điều đó lại xảy ra? (Phân tích nguyên nhân)",
      "bold": false,
      "type": "child"
    },
    {
      "id": 47,
      "value": "Điều gì sẽ xảy ra tiếp theo? (Phân tích dự đoán)",
      "bold": false,
      "type": "child"
    },
    {
      "id": 48,
      "value": "Người thực hiện quá trình phân tích dữ liệu, có kiến thức về thống kê, máy học, lập trình, các công cụ phân tích dữ liệu chính, Tìm kiếm, làm sạch và chuẩn bị dữ liệu cho quá trình phân tích, Truyền đạt các phát hiện của mình, những insights có giá trị một cách rõ ràng và hiệu quả, để hỗ trợ ra quyết định cho các bên liên quan chính là Data Analyst -  Nhà phân tích dữ liệu.",
      "bold": false,
      "type": "description"
    },
    {
      "id": 49,
      "value": "Ví dụ: Một Data Analyst trong doanh nghiệp Marketing có thể sử dụng dữ liệu để:",
      "bold": false,
      "type": "description"
    },
    {
      "id": 50,
      "value": "Xác định phân khúc khách hàng: Dựa vào đặc điểm chung của từng nhóm khách hàng  như độ tuổi, giới tính, hành vi mua sắm,..., nhóm khách thường xuyên mua hàng?, Mặt hàng thường xuyên được mua?,...",
      "bold": false,
      "type": "child"
    },
    {
      "id": 51,
      "value": "Đánh giá hiệu quả chiến lược áp dụng: so sánh hiệu quả của các kênh quảng cáo khác nhau (Google Ads, Facebook Ads, TikTok Ads...), Nên quảng cáo sản phẩm nào cho đối tượng khách hàng nào?",
      "bold": false,
      "type": "child"
    },
    {
      "id": 52,
      "value": "Dự đoán xu hướng thị trường: Sản phẩm tiềm năng trong mùa tới? Chiến lược nên triển khai ",
      "bold": false,
      "type": "child"
    },
    {
      "id": 53,
      "value": "2. Khám phá xem bạn có phải là một nhà phân tích hay không",
      "bold": true,
      "type": "description"
    },
    {
      "id": 54,
      "value": "Làm việc với các bảng excel, kết nối các bảng lại với nhau bằng VLOOKUP hay HLOOKUP, tạo một số biểu đồ với chính những công cụ có sẵn trong Microsoft Excel chính là một phần trong quá trình khám phá data của những nhà phân tích dữ liệu. Tư duy logic là một trong những nền tảng vững chắc để trở thành một nhà phân tích dữ liệu tiềm năng khi làm việc với lượng số liệu lớn. Với một bộ dữ liệu lớn, suy nghĩ theo lối logic sẽ giúp ta đặt ra những giả thuyết hợp lý và có cơ sở.  So sánh các bảng dữ liệu và đối chiếu số liệu với nhau để xem xét các trường dữ liệu có mối quan hệ với nhau như thế nào?",
      "bold": false,
      "type": "description"
    },
    {
      "id": 55,
      "value": "Khi làm việc với các dữ liệu, điều kiện tiên quyết chính là sự cẩn thận, tỉ mỉ và tinh thần tập trung cao độ trong công việc. Nếu dữ liệu không chính xác, không đầy đủ hoặc bị sai sót, kết quả phân tích sẽ không đáng tin cậy. Các định hướng kinh doanh quan trọng trong tương lai có thể gây ra những tổn thất nghiêm trọng nếu có sai sót nhỏ trong quá trình phân tích dữ liệu.",
      "bold": false,
      "type": "description"
    },
    {
      "id": 56,
      "value": "3. Vai trò của phân tích dữ liệu trong tổ chức",
      "bold": true,
      "type": "description"
    },
    {
      "id": 57,
      "value": "Thu thập các bộ dữ liệu từ nhiều nguồn khác nhau như hệ thống công nghệ, các báo cáo, khảo sát,... Tiếp theo, thực hiện xử lý và làm sạch dữ liệu, loại bỏ các thông tin sai lệch, không đầy đủ hoặc không nhất quán.",
      "bold": false,
      "type": "description"
    },
    {
      "id": 58,
      "value": "Nghiên cứu và phân tích dữ liệu nhằm hiểu rõ bản chất và mối quan hệ của các thông tin để làm cơ sở cho việc lập luận, tính toán. Sử dụng các kỹ thuật phân tích thống kê và các công cụ phân tích dữ liệu để tìm hiểu các mẫu, xu hướng và mối quan hệ trong dữ liệu. ",
      "bold": false,
      "type": "description"
    },
    {
      "id": 59,
      "value": "Chuẩn bị báo cáo, biểu đồ và trình bày các phát hiện và khuyến nghị dựa trên kết quả phân tích để hỗ trợ việc ra quyết định, giúp doanh nghiệp nhận diện, đánh giá và quản lý các rủi ro về tài chính, pháp lý, an ninh,...Từ đó, cải thiện sản phẩm đầu ra, cải thiện dịch vụ khách hàng, góp phần xác định và giải quyết vấn đề tổn tại trong quy trình vận hành của doanh nghiệp.",
      "bold": false,
      "type": "description"
    },
    {
      "id": 60,
      "value": "4. Hiểu các loại vai trò công việc liên quan đến dữ liệu",
      "bold": true,
      "type": "description"
    },
    {
      "id": 61,
      "value": "Trong kỷ nguyên số, dữ liệu trở thành tài sản vô giá của các doanh nghiệp, cơ hội cho các vị trí liên quan đến quản trị dữ liệu đã đang và sẽ trở thành cơ hội lớn cho cả các nhà tuyển dụng và ứng viên trong tương lai gần. ",
      "bold": false,
      "type": "description"
    },
    {
      "id": 62,
      "value": "Tuy có các công việc liên quan đến dữ liệu rất rộng và trải dài qua nhiều lĩnh vực khác nhau. Mục đích chung khi khám phá và phân tích những dữ liệu đó là để hỗ trợ ra quyết định thông minh và chính xác trong doanh nghiệp. Hiểu được kiến thức tổng quan về database (cơ sở dữ liệu), nắm rõ việc truy xuất vào môi trường data nào không làm ảnh hưởng đến hiệu suất hoạt động của hệ thống. Thực hiện các thao tác truy vấn, làm sạch và chuyển đổi dữ liệu thô (có các giá trị thiếu hoặc thừa) thành dữ liệu có chất lượng và giá trị khai thác cao đối với doanh nghiệp.",
      "bold": false,
      "type": "description"
    },
    {
      "id": 63,
      "value": "Đặt vấn đề, đặt giả thiết, dùng data đề chứng minh thật chặt chẽ và logic.  Có phương pháp trình bày thông minh đề người xem có thể hiểu trọn vẹn thông điệp của mình. Bên cạnh đó, vẽ biểu đồ, Dashboard là một công việc gần như chủ yếu của một Data Analyst, giúp ban lãnh đạo và  những người quản lý nắm được tình hình phát triển của công ty.",
      "bold": false,
      "type": "description"
    },
    {
      "id": 64,
      "value": "Ví dụ: Công ty  đang kinh doanh sản phẩm gì ? (Ecommerce, Logistics, F&B,..) Doanh thu được tạo ra từ đâu ? Sử dụng những kênh quảng cáo nào ? Tình hình kinh doanh? Chiến lược được áp dụng có tác động tích cực hay tiêu cực lên doanh số? Sản phẩm có tiềm năng phát triển trong thời gian tới? ",
      "bold": false,
      "type": "description"
    },
    {
      "id": 65,
      "value": "5. Khám phá các kỹ năng của nhà phân tích dữ liệu",
      "bold": true,
      "type": "description"
    },
    {
      "id": 66,
      "value": "Có khả năng hiểu rõ câu hỏi cần trả lời hoặc tự đặt ra những câu hỏi: Các nhà phân tích dữ liệu cần sử dụng khả năng tư duy logic để phân tích vấn đề, khả năng định nghĩa vấn đề một cách rõ ràng và khả năng giao tiếp hiệu quả để trao đổi với các bên liên quan.Tìm kiếm và thu thập dữ liệu để giải quyết những bài toán kinh doanh: Từ những vấn đề được đặt ra, các DA sẽ tìm kiếm những bộ data thích hợp để tiến hành phân tích từ nguồn database của công ty hoặc từ các nguồn khác",
      "bold": false,
      "type": "description"
    },
    {
      "id": 67,
      "value": "Hiểu được chất lượng của dữ liệu: Chất lượng của dữ liệu ảnh hưởng trực tiếp đến độ tin cậy của kết quả phân tích, với dữ liệu có chất lượng thấp sẽ ảnh hưởng tiêu cực đến năng suất, lợi nhuận của mỗi tổ chức đặc biệt khi mọi hành động, quyết định, chiến lược đều dựa vào dữ liệu",
      "bold": false,
      "type": "description"
    },
    {
      "id": 68,
      "value": "Xác định những trường dữ liệu quan trọng: Không phải tất cả dữ liệu đều quan trọng để trả lời câu hỏi, việc lựa chọn những dữ liệu, xác định dữ liệu nào là quan trọng và đòi hỏi kiến thức về lĩnh vực để hiểu mối liên hệ giữa dữ liệu và câu hỏi.",
      "bold": false,
      "type": "description"
    },
    {
      "id": 69,
      "value": "Tính toán và tạo ra dữ liệu hợp lệ: Để trả lời các câu hỏi kinh doanh, nhà phân tích dữ liệu phải trang bị kiến thức về thống kê để chọn phương pháp tính toán phù hợp, sử dụng các công cụ để tính toán dựa trên dữ liệu.",
      "bold": false,
      "type": "description"
    },
    {
      "id": 70,
      "value": "Để giải đáp các bài toán kinh doanh dựa trên dữ liệu, các nhà phân tích dữ liệu cần trang bị cho bản thân lượng kiến thức về chuyên môn và quá trình thực hiện phân tích data với 4 giai đoạn chính:",
      "bold": false,
      "type": "description"
    },
    {
      "id": 71,
      "value": "/assets/images/dashboar/table-chuong1.png",
      "bold": false,
      "type": "image"
    },
    {
      "id": 72,
      "value": "QUIZ|LEARNING DATA ANALYTICS",
      "bold": true,
      "type": "title"
    },
    {
      "id": 72,
      "value": "LEARNING DATA ANALYTICS",
      "bold": false,
      "type": "title"
    },
    {
      "id": 73,
      "value": 'https://www.youtube.com/embed/2fanjSYVElY',
      "bold": false,
      "type": "video"
    },
  ]