import { createSelector } from "@reduxjs/toolkit";
export const systemSelector = (state) => state.system;
export const ChatSelector = (state) => state.chat;
// export const searchTextSelector = (state) => state.filters.search;
// export const searchStatusSelector = (state) => state.filters.FilterByStatus;
// export const searchPrioritySelector = (state) => state.filters.FilterByPriority;
// export const todosRemainingSelector = createSelector(
//     todolistSelector,
//     searchStatusSelector,
//     searchPrioritySelector,
//     searchTextSelector,
//     (todoList, status, prioriry, searchText) => {
//         return todoList.filter((todo) => {
//             if (status === 'All') {
//                 return prioriry.length
//                     ? todo.name.includes(searchText) && prioriry.includes(todo.prioriry)
//                     : todo.name.includes(searchText);
//             }
//             return todo.name.includes(searchText) && status === 'Completed'
//                 ? todo.completed && (prioriry.length ? prioriry.includes(todo.prioriry) : true)
//                 : !todo.completed && (prioriry.length ? prioriry.includes(todo.prioriry) : true);
//         });
//     },
// );
