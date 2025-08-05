const board = document.getElementById('noticeBoard');
const saveNotice = document.getElementById('saveNotice');
const modal = new bootstrap.Modal(document.getElementById('noticeModal'));
const postBtn = document.getElementById('postBtn');

let notices = JSON.parse(localStorage.getItem('notices')) || [];
 notices = [
    {
    title: "🧹 Cleanliness Drive: Volunteers Needed",
    text: "Join our Swachh Bharat community cleanup at Nehru Park on Sunday, 4th Aug, 7 AM onward. Gloves and refreshments provided!",
    type: "Event",
    date: "2025-07-30",
    comments: []

    },
    {
    title: "🎒 Tuition Classes Starting",
    text: "Evening tuition classes for Class 6–10 (Maths & Science) starting from August 5 at Community Center, Block A. Call: 98989XXXXX",
    type: "Event",
    date: "2025-08-01",
    comments: []
    },
    {
      title: "📢 Maintenance Notice",
      text: "Water supply will be interrupted in Block C on August 4 from 10 AM to 2 PM due to pipeline maintenance.",
      type: "Announcement",
      date: "2025-07-27",
      comments: []
    },
    {
      title: "📣 Exam Schedule Released",
      text: "The final exam schedule for B.Tech 2nd year is released. Check the notice board or download from the college portal.",
      type: "Announcement",
      date: "2025-07-28",
      comments: []
    },
    {
      title: "📣 Buy Car",
      text: "Buying a used car in good condition. Budget: ₹5,00,000. Contact: 98765XXXXX",
      type: "Buy",
      date: "2025-07-28",
      comments: []
    },
    {
      title: "📣 Sell bike",
      text: "Selling my Honda CB Shine 2018 model, single owner, well maintained. Price: ₹60,000. Contact: 98765XXXXX",
      type: "Sell",
      date: "2025-07-28",
      comments: []
    },
    {
      title: "📣 Rent Room",
      text: "Room available for rent in Sector 15, fully furnished, near metro station. Rent: ₹10,000/month. Contact: 98765XXXXX",
      type: "Rent",
      date: "2025-07-28",
      comments: []
    },
    {
      title: "📣 Rent Flat",
      text: "2BHK flat available for rent in Sector 16, fully furnished, near market. Rent: ₹20,000/month. Contact: 98765XXXXX",
      type: "Rent",
      date: "2025-07-28",
      comments: []
    }
  ];
  localStorage.setItem('notices', JSON.stringify(notices));
function saveToStorage() {
  localStorage.setItem('notices', JSON.stringify(notices));
}

function renderNotices() {
  board.innerHTML = '';
  notices.forEach((n, index) => {
    const col = document.createElement('div');
    col.className = 'col-md-5 col-sm-12 mb-4';

    const card = document.createElement('div');
    card.className = 'card shadow-sm notice-card';

    const body = document.createElement('div');
    body.className = 'card-body';

    body.innerHTML = `
      <span class="badge bg-info mb-2">${n.type}</span>
      <h5 class="card-title">${n.title}</h5>
      <p class="card-text"><small class="text-muted">Posted on ${n.date}</small></p>
      <p>${n.text}</p>
      <button class="btn btn-outline-primary btn-sm mb-2" onclick="toggleComments(${index})" id="toggleBtn-${index}">Show Comments</button>
      <div id="comments-${index}" class="comment-section d-none">
        <div class="comment-list mb-2">
          ${n.comments.map((c, i) => `
            <div class="comment d-flex justify-content-between align-items-center mb-1">
              <span>${c}</span>
              <button class="btn btn-danger btn-sm px-3 py-1 ms-2" onclick="deleteComment(${index}, ${i})">Delete</button>
            </div>
          `).join('')}
        </div>
        <div class="d-flex">
          <input class="form-control me-2" type="text" placeholder="Add a comment..." id="comment-${index}" />
          <button class="btn btn-outline-secondary btn-sm" onclick="addComment(${index})">Post</button>
        </div>
      </div>
    `;

    card.appendChild(body);
    col.appendChild(card);
    board.appendChild(col);
  });
}

function toggleComments(index) {
  const section = document.getElementById(`comments-${index}`);
  const button = document.getElementById(`toggleBtn-${index}`);
  const isHidden = section.classList.contains('d-none');
  section.classList.toggle('d-none');
  button.textContent = isHidden ? 'Hide Comments' : 'Show Comments';
}

function addComment(index) {
  const input = document.getElementById(`comment-${index}`);
  const comment = input.value.trim();
  if (comment) {
    notices[index].comments.push(comment);
    saveToStorage();
    renderNotices();
  }
}

function deleteComment(noticeIndex, commentIndex) {
  notices[noticeIndex].comments.splice(commentIndex, 1);
  saveToStorage();
  renderNotices();
}

postBtn.onclick = () => modal.show();

saveNotice.onclick = () => {
  const title = document.getElementById('noticeTitle').value.trim();
  const text = document.getElementById('noticeText').value.trim();
  const type = document.getElementById('noticeType').value;

  if (!title || !text) {
    alert("Please fill all fields.");
    return;
  }

  const newNotice = {
    title,
    text,
    type,
    date: new Date().toLocaleString(),
    comments: []
  };

  notices.unshift(newNotice);
  saveToStorage();
  renderNotices();
  modal.hide();
};

renderNotices();
