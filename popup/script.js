async function getReplies() {
  const storage = await chrome.storage.sync.get(null);

  console.log(storage);

  return storage.replies ?? [];
}

async function createNewReply(newId) {
  const replies = await getReplies();

  const newReplies = [
    ...replies,
    {
      id: newId,
      value: ''
    }
  ];

  try {
    await chrome.storage.sync.set({ replies: newReplies });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function editReply(replyId, newValue) {
  const replies = await getReplies();

  const newReplies = replies.map((reply) => {
    if (reply.id === replyId) {
      return {
        id: reply.id,
        value: newValue
      };
    }

    return reply;
  });

  try {
    await chrome.storage.sync.set({ replies: newReplies });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function deleteReply(replyId) {
  const replies = await getReplies();

  const newReplies = replies.filter((reply) => reply.id !== replyId);

  try {
    await chrome.storage.sync.set({ replies: newReplies });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function getDelay() {
  const storage = await chrome.storage.sync.get(null);

  return storage.delay ?? 0;
}

async function setDelay(newDelay) {
  try {
    await chrome.storage.sync.set({ delay: newDelay });

    return true;
  } catch (e) {
    return false;
  }
}

function renderReply(replyId, replyValue, target) {
  const newReply = document.createElement('div');
  newReply.id = `reply-${replyId}`;
  newReply.className = 'flex w-4/5 mx-auto bg-white bg-opacity-10';

  const textArea = document.createElement('textarea');
  textArea.setAttribute('data-reply-id', replyId);
  textArea.className =
    'p-2 overflow-none h-30 text-base border-0 bg-transparent resize-none text-white caret-white outline-none w-4/5';
  textArea.value = replyValue;

  const buttonsDiv = document.createElement('div');
  buttonsDiv.className =
    'py-5 px-2 w-1/5 flex flex-col items-center justify-between';
  buttonsDiv.innerHTML = `
      <svg data-reply-id="${replyId}" role="delete-reply" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-white text-opacity-60 w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    `;

  newReply.appendChild(textArea);
  newReply.appendChild(buttonsDiv);

  target.appendChild(newReply);

  textArea.addEventListener('mouseleave', async (evt) => {
    editReply(replyId, textArea.value);
  });

  buttonsDiv.addEventListener('click', async (evt) => {
    deleteReply(replyId);

    unrenderReply(replyId);
  });
}

function unrenderReply(replyId) {
  const target = document.getElementById(`reply-${replyId}`);

  target.parentElement.removeChild(target);
}

window.addEventListener('load', async (evt) => {
  const addReplyButton = document.getElementById('buttonAddReply');
  const replyList = document.getElementById('replyList');
  const delayInput = document.getElementById('delayInput');

  const delay = await getDelay();
  delayInput.value = delay;

  addReplyButton.addEventListener('click', async (evt) => {
    const newId = `reply-${new Date().getTime()}`;

    renderReply(newId, '', replyList);

    await createNewReply(newId);
  });

  delayInput.addEventListener('change', async (evt) => {
    await setDelay(delayInput.value);

    console.log(delayInput.value);

    console.log(await getDelay());
  });

  const replies = await getReplies();
  replies.forEach((reply) => renderReply(reply.id, reply.value, replyList));
});
