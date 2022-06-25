<?php

namespace App\Console\Commands;

use App\Mail\TempMail;
use App\Models\Email;
use App\Models\EmailSender;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\View;

class DailyEmailSender extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mailer:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This is a command for daily scheduled email senders';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $dailySenders = EmailSender::where(['frequency' => 'daily', 'status' => 'running'])->get();
        foreach($dailySenders as $dailySender){
            $emails = Email::where('list_id', $dailySender->list_id)->get();
            foreach($emails as $email){
                $user = User::find($dailySender->author_id);
                $view = str_replace("/", '.', $dailySender->view);
                //create mail
                $data = [
                    'email' => $email->email,
                    'subject' => $dailySender->subject,
                    'reply_email' => $dailySender->reply_email,
                    'user_email' => $user->email,
                    'user_full_name' => $user->full_name
                ];
                Mail::send(new TempMail($view, $data));
            }            
        }
        return 0;
    }
}
