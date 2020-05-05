
$(document).ready(() => {
    loadData();

    $('table tbody').on('click', '.btn-edit', function (e) {
        let id = $(this).attr('dataid');
        dataModal(id)
    })

    $('.btn-edit').on('click', '.btn-change', function (e) {
        let id = $('#editId').val();
        let string = $('#editString').val();
        let integer = $('#editInteger').val();
        let float = $('#editFloat').val();
        let date = $('#editDate').val();
        let bool = $('#editBoolean').val();
        editData(id, string, integer, float, date, bool);
    })

    $('.btn-add').on('click', '.btn-save', function (e) {
        // e.preventDefault();
        let string = $('#addString').val();
        let integer = $('#addInteger').val();
        let float = $('#addFloat').val();
        let date = $('#addDate').val();
        let bool = $('#addBoolean').val();

        console.log([string, integer, float, date, bool]);
        addData(string, integer, float, date, bool);
    })

    $('table tbody').on('click', '.btn-delete', function () {
        if (confirm('Yakin data akan dihapus?')) {
            let id = $(this).attr('dataid');
            // console.log(id);
            deleteData(id);
        }
    })
})

// ==================== Load Data ======================================
const loadData = () => {
    $.ajax({
        methdod: "GET",
        url: "http://localhost:3000/api/",
        data: {}, //diisi ketika kamu butuh filter
        dataType: "json"
    }).done(result => {
        let data = result.data;
        let html = "";
        data.forEach(item => {
            html += `<tr>
                    <td>${item.id}</td>
                    <td>${item.stringdata}</td>
                    <td>${item.integerdata}</td>
                    <td>${item.floatdata}</td>
                    <td>${moment(item.datedata).format('DD-MMMM-YYYY')}</td>
                    <td>${item.booleandata}</td>
                    <td>
                      <button type="button" class="btn btn-success btn-edit" dataid="${item.id}" data-toggle="modal" data-target="#editModal"> Edit </button>
                      <button type="button" class="btn btn-danger btn-delete" dataid="${item.id}"> Delete </button>
                    </td>                  
                </tr>`
        });
        let pagination = `<li class="page-item"><a class="page-link" href="#">Previous</a></li>\n`;
        for (i = 1; i <= result.pages; i++) {
        pagination +=  `<li class="page-item"><a class="page-link" href="#">${i}</a></li>\n`
        }

        pagination +=  `<li class="page-item"><a class="page-link" href="#">Next</a></li>\n`
        $("table tbody").html(html);
        $('nav ul').html(pagination);
    })
        .fail(function (err) {
            console.log("gagal-read")
        });
}

// ==================== Add ======================================
const addData = (stringdata, integerdata, floatdata, datedata, booleandata) => {
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/api/",
        data: { stringdata, integerdata, floatdata, datedata, booleandata },
        dataType: 'json'
    }).done(() => {
        loadData();
    })
        .fail((err) => {
            console.log("gagal-add")
        });
    $('#addForm').trigger('reset');
}

// ==================== Delete ======================================
const deleteData = (id) => {
    $.ajax({
        method: "DELETE",
        url: "http://localhost:3000/api/" + id,
        dataType: 'json'
    })
        .done(() => {
            loadData();
        })
        .fail((err) => {
            console.log('error delete');
        })
}

// ===================== Edit (PUT)===================================
const editData = (id, stringdata, integerdata, floatdata, datedata, booleandata) => {
    $.ajax({
        method: "PUT",
        url: "http://localhost:3000/api/" + id,
        data: { stringdata, integerdata, floatdata, datedata, booleandata },
        dataType: 'json'
    }).done(() => {
        loadData();
    })
        .fail((err) => {
            console.log("gagal-edit")
        });
}

// =================== Edit (GET), show data in edit-modal ==============
const dataModal = id => {
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/api/` + id,
        dataType: 'json'
    })
        .done(result => {
            console.log(result);
            let html = '';
            let item = result.data;
            $('#editId').val(item.id);
            $('#editString').val(item.stringdata);
            $('#editInteger').val(item.integerdata);
            $('#editFloat').val(item.floatdata);
            $('#editDate').val(moment(item.datedata).format('YYYY-MM-DD'));

            if (item.booleandata == true) {
                html += `<option value="true" selected>true</option>
                            <option value="false">false</option>`;
            } else {
                html += `<option value="false" selected>false</option>
                <option value="true">true</option>`;
            };
            $('#editBoolean').html(html);
        })
        .fail(() => {
            console.log('edit-data gagal');
        })

};
